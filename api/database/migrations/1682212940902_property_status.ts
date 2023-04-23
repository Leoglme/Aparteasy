import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'property_status'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table
        .integer('property_id')
        .unsigned()
        .references('id')
        .inTable('properties')
        .onDelete('CASCADE')
      table.integer('status_id').unsigned().references('id').inTable('status').onDelete('CASCADE')
      table.boolean('is_active').defaultTo(false)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
