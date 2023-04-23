import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Location extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public region: string

  @column()
  public country: string

  @column()
  public lat: number

  @column()
  public lng: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
