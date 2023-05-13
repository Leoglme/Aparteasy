import { Chance } from 'chance'
import axios from 'axios'

interface LocationData {
  address: string
  city: string
  region: string
  country: string
  lat: number
  lng: number
}

interface OsmReverseResponse {
  class?: string
}

export async function generateLocations(n: number): Promise<LocationData[]> {
  const chance = new Chance()
  const locations: LocationData[] = []

  const franceBoundingBox = {
    minLat: 41.0,
    maxLat: 51.5,
    minLng: -5.5,
    maxLng: 10.0,
  }

  async function isLand(lat: number, lng: number): Promise<boolean> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    try {
      const response = await axios.get<OsmReverseResponse>(url)
      return response.data.class !== 'water'
    } catch (error) {
      return false
    }
  }

  function randomFranceLatLng() {
    const lat = chance.floating({
      min: franceBoundingBox.minLat,
      max: franceBoundingBox.maxLat,
    })

    const lng = chance.floating({
      min: franceBoundingBox.minLng,
      max: franceBoundingBox.maxLng,
    })

    return { lat, lng }
  }

  while (locations.length < n) {
    const address = chance.address()
    const city = chance.city()
    const region = chance.state()
    const country = 'France'
    let { lat, lng } = randomFranceLatLng()

    while (!(await isLand(lat, lng))) {
      const newCoords = randomFranceLatLng()
      lat = newCoords.lat
      lng = newCoords.lng
    }

    locations.push({ address, city, region, country, lat, lng })
  }

  return locations
}
