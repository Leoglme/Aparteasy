import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SearchesUpdateUserIdToCreatorId extends BaseSchema {
  protected tableName = 'searches'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('creator_id').unsigned().after('location_id')
    })

    await this.defer(async (db) => {
      await db.rawQuery('UPDATE searches SET creator_id = user_id')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('user_id')
      table.dropColumn('user_id')
      table.foreign('creator_id').references('id').inTable('users').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().after('location_id')
    })

    await this.defer(async (db) => {
      await db.rawQuery('UPDATE searches SET user_id = creator_id')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('creator_id')
      table.dropColumn('creator_id')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    })
  }
}
