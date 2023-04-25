import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Search from 'App/Models/Search'

export default class SearchInvitation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public search_id: number

  @column()
  public sender_id: number

  @column()
  public receiver: string

  @column()
  public accepted: boolean

  @belongsTo(() => Search, {
    foreignKey: 'search_id',
  })
  public search: BelongsTo<typeof Search>

  @belongsTo(() => User, { foreignKey: 'sender_id' })
  public sender: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
