import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SearchInvitations extends BaseSchema {
  protected tableName = 'search_invitations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('search_id').unsigned().references('id').inTable('searches').onDelete('CASCADE')
      table.integer('inviter_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('invitee_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.boolean('accepted').defaultTo(false)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
