import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, hasMany } from '@ioc:Adonis/Lucid/Orm'
import type { HasMany } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Search from 'App/Models/Search'
import Location from 'App/Models/Location'
import PropertyRating from 'App/Models/PropertyRating'

export default class Property extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public url: string

  @column()
  public price: number

  @column()
  public amount_of_charges: number

  @column.dateTime()
  public availability_date: DateTime

  @column()
  public location_id: number

  @column()
  public number_of_rooms: number

  @column()
  public surface_area: number

  @column()
  public quality_rating: number

  @column()
  public comment: string | null

  @column()
  public search_id: number

  @column({
    serialize: (value?: Number) => {
      return Boolean(value)
    },
  })
  public is_deleted: boolean

  @column({
    serialize: (value?: Number) => {
      return Boolean(value)
    },
  })
  public contacted: boolean

  @column({
    serialize: (value?: Number) => {
      return Boolean(value)
    },
  })
  public available: boolean

  @belongsTo(() => Location, {
    foreignKey: 'location_id',
  })
  public location: BelongsTo<typeof Location>

  @belongsTo(() => Search, {
    foreignKey: 'search_id',
  })
  public search: BelongsTo<typeof Search>

  @hasMany(() => PropertyRating, {
    foreignKey: 'property_id',
  })
  public ratings: HasMany<typeof PropertyRating>

  public total_price(): number {
    return this.price + this.amount_of_charges
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
