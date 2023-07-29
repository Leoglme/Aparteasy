import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RemoveLocationIdFromSearches extends BaseSchema {
  protected tableName = 'searches'

  public async up() {
    const result = await Database.rawQuery(`
      SELECT COUNT(*) as count
      FROM information_schema.table_constraints
      WHERE constraint_schema = 'your_database_name'
      AND table_name = 'searches'
      AND constraint_name = 'searches_location_id_foreign'
    `)

    const count = result[0].count

    if (count > 0) {
      await this.schema.table(this.tableName, (table) => {
        table.dropForeign(['location_id'])
        table.dropColumn('location_id')
      })
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
        table.foreign('location_id')
      })
    }
  }
}
