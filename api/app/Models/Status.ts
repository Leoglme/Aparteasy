import { DateTime } from 'luxon'
import { column, BaseModel, hasMany } from '@ioc:Adonis/Lucid/Orm'
import type { HasMany } from '@ioc:Adonis/Lucid/Orm'
import PropertyStatus from 'App/Models/PropertyStatus'
import { StatusEnum } from 'App/Enums/StatusEnum'

export default class Status extends BaseModel {
  public static table = 'status'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: StatusEnum

  @hasMany(() => PropertyStatus)
  public properties: HasMany<typeof PropertyStatus>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
