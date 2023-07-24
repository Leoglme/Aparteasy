import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MoveSearchesLocationsToUserLocations extends BaseSchema {
  public async up() {
    const searches = await Database.from('searches').whereNotNull('location_id')

    for (let search of searches) {
      await Database.table('user_locations').insert({
        user_id: search.user_id,
        location_id: search.location_id,
        name: `Location ${search.location_id}`,
      })
    }
  }

  public async down() {}
}
