import BaseService from 'App/Services/BaseService'
import Search from 'App/Models/Search'
import SearchValidator from 'App/Validators/SearchValidator'
import AuthService from 'App/Services/AuthService'
import SearchUser from 'App/Models/SearchUser'
import User from 'App/Models/User'
import merge from 'lodash/merge'

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
      .preload('creator')
      .where('id', id)
      .firstOrFail()

    if (!search) {
      super.response.notFound()
      return null
    }

    const users = this.mergeCreatorWithInvitedUsers(search)
    merge(search.serialize(), { users })
    return search
  }

  public static async create() {
    const data = await super.request.validate(SearchValidator)
    if (!super.auth.user?.id) {
      AuthService.unauthorized()
      return
    }
    const search = await Search.create({
      ...data,
      creator_id: super.auth.user?.id,
    })
    await super.sendPrivateSuccessNotification(`Votre recherche a été créée avec succès !`)
    return await this.getById(search.id)
  }

  public static async delete(id: number) {
    await Search.findOrFail(id).then((search) => search.delete())
    await super.sendPrivateSuccessNotification(`Votre recherche a été supprimée avec succès !`)
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
      .preload('creator')
      .preload('users')
      .orderBy('created_at', 'desc')
      .exec()
  }

  public static async addUserToSearch(searchId: number, userId: number) {
    return await SearchUser.create({ search_id: searchId, user_id: userId })
  }

  private static mergeCreatorWithInvitedUsers(search: Search): User[] {
    const { creator, users } = search
    return [creator, ...users]
  }
}
