import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Location from 'App/Models/Location'

export default class Search extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public location_id: number

  @column()
  public user_id: number

  @belongsTo(() => Location)
  public location: BelongsTo<typeof Location>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
