import { Chance } from 'chance'
import User from 'App/Models/User'
import Search from 'App/Models/Search'
import SearchService from 'App/Services/SearchService'

export async function addUsersToSearches(searches: Search[], users: User[]): Promise<void> {
  const chance = new Chance()

  for (const search of searches) {
    // Select a random number of users to add to the search (between 0 and 2)
    const numUsersToAdd = chance.integer({ min: 1, max: 3 })

    // Shuffle the list of users and select the first numUsersToAdd users
    const usersToAdd = chance.shuffle(users).slice(0, numUsersToAdd)

    // Attach the selected users to the search
    for (const user of usersToAdd) {
      await SearchService.addUserToSearch(search.id, user.id)
    }
  }
}
