import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Search extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public creator_id: number

  @belongsTo(() => User, {
    foreignKey: 'creator_id',
    serializeAs: null,
  })
  public creator: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'search_users',
  })
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
