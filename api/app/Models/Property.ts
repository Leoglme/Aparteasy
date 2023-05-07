import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo, manyToMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import type { ManyToMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Search from 'App/Models/Search'
import Location from 'App/Models/Location'
import Status from 'App/Models/Status'
import PropertyRating from 'App/Models/PropertyRating'

export default class Property extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public price: number

  @column()
  public charges: number

  @column.dateTime()
  public availability_date: DateTime

  @column()
  public location_id: number

  @column()
  public number_of_bedrooms: number

  @column()
  public surface_area: number

  @column()
  public quality_rating: number

  @column()
  public transport_time: string

  @column()
  public search_id: number

  @column({
    serialize: (value?: Number) => {
      return Boolean(value)
    },
  })
  public is_deleted: boolean

  @belongsTo(() => Location, {
    foreignKey: 'location_id',
  })
  public location: BelongsTo<typeof Location>

  @belongsTo(() => Search, {
    foreignKey: 'search_id',
  })
  public search: BelongsTo<typeof Search>

  @manyToMany(() => Status, {
    pivotTable: 'property_statuses',
    pivotForeignKey: 'property_id',
    pivotRelatedForeignKey: 'status_id',
  })
  public statuses: ManyToMany<typeof Status>

  @hasMany(() => PropertyRating, {
    foreignKey: 'property_id',
  })
  public ratings: HasMany<typeof PropertyRating>

  public total_price(): number {
    return this.price + this.charges
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
