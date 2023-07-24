import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Location from 'App/Models/Location'

export default class UserLocation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string | null

  @column()
  public user_id: number

  @column()
  public location_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Location, {
    foreignKey: 'location_id',
  })
  public location: BelongsTo<typeof Location>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
