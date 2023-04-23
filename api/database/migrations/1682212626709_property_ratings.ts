import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'property_ratings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table
        .integer('property_id')
        .unsigned()
        .references('id')
        .inTable('properties')
        .onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('rating').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
