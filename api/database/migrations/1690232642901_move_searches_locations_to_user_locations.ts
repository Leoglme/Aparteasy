import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MoveSearchesLocationsToUserLocations extends BaseSchema {
  public async up() {
    const searchUsers = await Database.from('search_users')

    searchUsers.map(async (searchUser) => {
      const search = await Database.from('searches')
        .where('id', searchUser.search_id)
        .whereNotNull('location_id')
        .first()

      await Database.table('user_locations').insert({
        user_id: searchUser.user_id,
        location_id: search.location_id,
        name: `Location ${search.location_id}`,
      })
    })

    const searches = await Database.from('searches').whereNotNull('location_id')

    searches.map(async (search) => {
      await Database.table('user_locations').insert({
        user_id: search.creator_id,
        location_id: search.location_id,
        name: `Location ${search.location_id}`,
      })
    })
  }

  public async down() {}
}
