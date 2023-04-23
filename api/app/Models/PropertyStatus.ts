import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Status from 'App/Models/Status'
import Property from 'App/Models/Property'

export default class PropertyStatus extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public property_id: number

  @column()
  public status_id: number

  @column()
  public is_active: boolean

  @belongsTo(() => Property)
  public property: BelongsTo<typeof Property>

  @belongsTo(() => Status)
  public status: BelongsTo<typeof Status>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
