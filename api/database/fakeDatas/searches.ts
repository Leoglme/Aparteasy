import { Chance } from 'chance'
import Location from 'App/Models/Location'
import User from 'App/Models/User'

interface SearchData {
  name: string
  location_id: number
  creator_id: number
}

export async function generateSearches(n: number, users: User[]): Promise<SearchData[]> {
  const chance = new Chance()
  const locations = await Location.all()

  const searches: SearchData[] = []
  for (let i = 0; i < n; i++) {
    const name = chance.word()
    const location = locations[chance.integer({ min: 0, max: locations.length - 1 })]
    const creator = users[chance.integer({ min: 0, max: users.length - 1 })]
    searches.push({ name, location_id: location.id, creator_id: creator.id })
  }
  return searches
}
