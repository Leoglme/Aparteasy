import { Chance } from 'chance'

interface LocationData {
  address: string
  city: string
  region: string
  country: string
  lat: number
  lng: number
}

export function generateLocations(n: number): LocationData[] {
  const chance = new Chance()
  const locations: LocationData[] = []

  const franceBoundingBox = {
    minLat: 41.0,
    maxLat: 51.5,
    minLng: -5.5,
    maxLng: 10.0,
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

  for (let i = 0; i < n; i++) {
    const address = chance.address()
    const city = chance.city()
    const region = chance.state()
    const country = 'France'
    const { lat, lng } = randomFranceLatLng()
    console.log({ lat, lng })
    locations.push({ address, city, region, country, lat, lng })
  }

  return locations
}
