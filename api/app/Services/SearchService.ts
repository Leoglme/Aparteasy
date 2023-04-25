import BaseService from 'App/Services/BaseService'
import Search from 'App/Models/Search'
import SearchValidator from 'App/Validators/SearchValidator'

export default class SearchService extends BaseService {
  public static async getAll() {
    return Search.all()
  }
  public static async getById(id: number) {
    return Search.findOrFail(id)
  }

  public static async create() {
    const data = await super.request.validate(SearchValidator)
    return await Search.create(data)
  }
  public static async delete(id: number) {
    await Search.findOrFail(id).then((search) => search.delete())
  }
}
