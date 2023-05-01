import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Property from 'App/Models/Property'
export default class PropertyRating extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public property_id: number

  @column()
  public user_id: number

  @column()
  public rating: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Property, {
    foreignKey: 'property_id',
  })
  public property: BelongsTo<typeof Property>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
