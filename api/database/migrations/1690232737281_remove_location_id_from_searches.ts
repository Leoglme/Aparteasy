import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RemoveLocationIdFromSearches extends BaseSchema {
  protected tableName = 'searches'

  public async up() {
    await this.schema.table(this.tableName, (table) => {
      table.dropForeign('location_id')
      table.dropColumn('location_id')
    })
  }

  public async down() {
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
