import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('address').notNullable().unique()
      table.string('city')
      table.string('region')
      table.string('country')
      table.float('lat', 9, 6)
      table.float('lng', 9, 6)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
