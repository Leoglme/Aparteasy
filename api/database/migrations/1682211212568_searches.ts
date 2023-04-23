import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'searches'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('name').notNullable()
      table
        .integer('location_id')
        .unsigned()
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
