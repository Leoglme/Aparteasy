import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, BaseModel, beforeSave, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import type { ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Search from 'App/Models/Search'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public oauthProviderId?: string

  @column()
  public oauthProviderName?: string

  @column({ serializeAs: null })
  public password: string

  @manyToMany(() => Search, {
    pivotTable: 'search_users',
  })
  public searches: ManyToMany<typeof Search>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
