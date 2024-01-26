import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RemoveLocationIdFromSearches extends BaseSchema {
  protected tableName = 'searches'

  public async up() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'location_id')
    if (hasColumn) {
      await Database.rawQuery('ALTER TABLE searches DROP FOREIGN KEY searches_location_id_foreign')
    }
  }

  public async down() {
    const hasColumn = await this.schema.hasColumn(this.tableName, 'location_id')
    if (!hasColumn) {
      await this.schema.table(this.tableName, (table) => {
        table
          .integer('location_id')
          .unsigned()
          .references('id')
          .inTable('locations')
          .onDelete('CASCADE')
      })
      await Database.rawQuery(
        'ALTER TABLE searches ADD CONSTRAINT searches_location_id_foreign FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE'
      )
    }
  }
}
