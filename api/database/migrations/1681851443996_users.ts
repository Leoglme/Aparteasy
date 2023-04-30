import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('email').notNullable().unique()
      table.string('name', 80).notNullable()
      table.string('avatar_url')
      table.string('password', 180)
      table.string('oauth_provider_id')
      table.string('oauth_provider_name')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
