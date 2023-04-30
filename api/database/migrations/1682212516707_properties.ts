import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'properties'

  public async up() {
    this.schema.createTable(this.tableName, async (table) => {
      table.increments()
      table.string('url').notNullable()
      table.float('price').notNullable().defaultTo(0)
      table.float('charges').notNullable().defaultTo(0)
      table.dateTime('availability_date', { useTz: true })
      table.integer('location_id').unsigned().references('id').inTable('locations')
      table.integer('number_of_bedrooms').unsigned()
      table.float('surface_area').unsigned()
      table.integer('quality_rating', 1).unsigned()
      table.string('transport_time')
      table.integer('search_id').unsigned().references('id').inTable('searches')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
