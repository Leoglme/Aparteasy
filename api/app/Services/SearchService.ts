import BaseService from 'App/Services/BaseService'
import Search from 'App/Models/Search'
import SearchValidator from 'App/Validators/SearchValidator'
import AuthService from 'App/Services/AuthService'
import SearchUser from 'App/Models/SearchUser'
import Event from '@ioc:Adonis/Core/Event'
import LocationService from 'App/Services/LocationService'

export default class SearchService extends BaseService {
  public static async getAll() {
    const searches = await this.getAllForUser()
    return searches?.map((search) => {
      return {
        ...search.serialize(),
        users: this.mergeCreatorWithInvitedUsers(search),
      }
    })
  }

  public static async getById(id: number) {
    const search = await Search.query()
      .preload('users')
      .preload('location')
      .preload('creator')
      .where('id', id)
      .firstOrFail()

    return {
      ...search.serialize(),
      users: this.mergeCreatorWithInvitedUsers(search),
    }
  }

  public static async create() {
    const data = await super.request.validate(SearchValidator)
    if (!super.auth.user?.id) {
      AuthService.unauthorized()
      return
    }
    const location = await LocationService.create(data.location)
    const search = await Search.create({
      ...data,
      creator_id: super.auth.user?.id,
      location_id: location.id,
    })
    await Event.emit('notify:success', `Votre recherche a été créée avec succès !`)
    return await this.getById(search.id)
  }

  public static async delete(id: number) {
    await Search.findOrFail(id).then((search) => search.delete())
    await Event.emit('notify:success', `La recherche a été supprimée avec succès !`)
    return super.response.noContent()
  }

  public static async getAllForUser() {
    const user = super.auth.user
    if (!user) {
      AuthService.unauthorized()
      return
    }
    return await Search.query()
      .whereHas('users', (query) => {
        query.where('user_id', user.id)
      })
      .orWhere('creator_id', user.id)
      .preload('location')
      .preload('creator')
      .preload('users')
      .exec()
  }

  public static async addUserToSearch(searchId: number, userId: number) {
    return await SearchUser.create({ search_id: searchId, user_id: userId })
  }

  private static mergeCreatorWithInvitedUsers(search: Search) {
    const { creator, users } = search
    return [creator, ...users]
  }
}
