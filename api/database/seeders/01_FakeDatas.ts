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
    const users = generateUsers(10)
    const createdUsers = await User.createMany(users)

    const locations = await generateLocations(20)
    await Location.createMany(locations)

    const userLocations = await generateUserLocations(10, createdUsers)
    await UserLocation.createMany(userLocations)

    const searches = await generateSearches(10, createdUsers)
    const createdSearches = await Search.createMany(searches)

    await addUsersToSearches(createdSearches, createdUsers)

    await addPropertiesToSearches(createdSearches)
  }
}
