import { Chance } from 'chance'
import User from 'App/Models/User'
import Location from 'App/Models/Location'

interface UserLocationData {
  name: string
  user_id: number
  location_id: number
}

export async function generateUserLocations(n: number, users: User[]): Promise<UserLocationData[]> {
  const chance = new Chance()
  const locations = await Location.all()

  const userLocations: UserLocationData[] = []
  for (let i = 0; i < n; i++) {
    const name = `Location ${i + 1}`
    const user = users[chance.integer({ min: 0, max: users.length - 1 })]
    const location = locations[chance.integer({ min: 0, max: locations.length - 1 })]
    userLocations.push({ name, user_id: user.id, location_id: location.id })
  }
  return userLocations
}
