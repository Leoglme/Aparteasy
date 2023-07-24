import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserLocations extends BaseSchema {
  protected tableName = 'user_locations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('location_id')
        .unsigned()
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE')
      table.string('name').nullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
