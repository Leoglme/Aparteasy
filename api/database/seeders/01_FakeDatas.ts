import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { generateUsers } from '../fakeDatas/users'
import { generateLocations } from 'Database/fakeDatas/location'
import Location from 'App/Models/Location'
import { generateSearches } from 'Database/fakeDatas/searches'
import Search from 'App/Models/Search'
import { addUsersToSearches } from 'Database/fakeDatas/searchUsers'
import { addPropertiesToSearches } from 'Database/fakeDatas/properties'
import { generateUserLocations } from 'Database/fakeDatas/userLocations'
import UserLocation from 'App/Models/UserLocation'

export default class FakeDatasSeeder extends BaseSeeder {
  public async run() {
    // Create users
    const maxUsers: number = 10
    const existingUsers: Array<User> = await User.all()
    if (existingUsers.length < maxUsers) {
      const users = generateUsers(maxUsers)
      await User.createMany(users)
    }

    // Create locations
    const maxLocations: number = 20
    const existingLocations: Array<Location> = await Location.all()
    if (existingLocations.length < maxLocations) {
      const locations = await generateLocations(maxLocations)
      await Location.createMany(locations)
    }

    // Create userLocations
    const maxUserLocations: number = 10
    const existingUserLocations: Array<UserLocation> = await UserLocation.all()
    if (existingUserLocations.length < maxUserLocations) {
      const userLocations = await generateUserLocations(maxUserLocations)
      await UserLocation.createMany(userLocations)
    }

    // Create searches
    const maxSearches: number = 10
    const existingSearches: Array<Search> = await Search.all()
    if (existingSearches.length < maxSearches) {
      // 10 users
      const createdUsers: Array<User> = await User.all()
      const tenUsers: Array<User> = createdUsers.slice(0, 10)

      // 10 searches
      const createdSearches: Array<Search> = await Search.all()
      const tenSearches: Array<Search> = createdSearches.slice(0, 10)
      const searches = await generateSearches(maxSearches, tenUsers)
      await Search.createMany(searches)
      await addUsersToSearches(tenSearches, createdUsers)
      await addPropertiesToSearches(tenSearches)
    }
  }
}
