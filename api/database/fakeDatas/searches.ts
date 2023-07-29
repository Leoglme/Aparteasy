import { Chance } from 'chance'
import User from 'App/Models/User'

interface SearchData {
  name: string
  creator_id: number
}

export async function generateSearches(n: number, users: User[]): Promise<SearchData[]> {
  const chance = new Chance()

  const searches: SearchData[] = []
  for (let i = 0; i < n; i++) {
    const name = chance.word()
    const creator = users[chance.integer({ min: 0, max: users.length - 1 })]
    searches.push({ name, creator_id: creator.id })
  }
  return searches
}
