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
  for (let i = 0; i < n; i++) {
    const address = chance.address()
    const city = chance.city()
    const region = chance.state()
    const country = chance.country()
    const lat = Number(chance.latitude())
    const lng = Number(chance.longitude())
    locations.push({ address, city, region, country, lat, lng })
  }
  return locations
}
