import BaseService from 'App/Services/BaseService'
import Search from 'App/Models/Search'
import SearchValidator from 'App/Validators/SearchValidator'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'

export default class SearchService extends BaseService {
  public static async getAll() {
    const searches = await this.getAllForUser()
    return searches.map((search) => {
      return {
        ...search.serialize(),
        users: this.mergeCreatorWithInvitedUsers(search),
      }
    })
  }

  public static async getById(id: number) {
    return await Search.query().preload('location').preload('creator').where('id', id).firstOrFail()
  }

  public static async create() {
    const data = await super.request.validate(SearchValidator)
    return await Search.create(data)
  }

  public static async delete(id: number) {
    await Search.findOrFail(id).then((search) => search.delete())
  }

  public static async getAllForUser() {
    const user = super.auth.user
    if (!user) {
      throw new AuthenticationException('Unauthorized access', 'E_UNAUTHORIZED_ACCESS')
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

  private static mergeCreatorWithInvitedUsers(search: Search) {
    const { creator, users } = search
    return [creator, ...users]
  }
}
