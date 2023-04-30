import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSchema {
  protected tableName = 'contraints'

  public async up() {
    await Database.rawQuery(`ALTER TABLE properties
        ADD CONSTRAINT quality_rating_check CHECK (quality_rating >= 1 AND quality_rating <= 5)`)
    await Database.rawQuery(`ALTER TABLE property_ratings
        ADD CONSTRAINT rating_check CHECK (rating >= 1 AND rating <= 5)`)
  }

  public async down() {
    await Database.rawQuery(`ALTER TABLE properties DROP CONSTRAINT quality_rating_check`)
    await Database.rawQuery(`ALTER TABLE property_ratings DROP CONSTRAINT rating_check`)
  }
}
