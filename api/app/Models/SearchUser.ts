import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Search from 'App/Models/Search'
import User from 'App/Models/User'

export default class SearchUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public search_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Search)
  public search: BelongsTo<typeof Search>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
