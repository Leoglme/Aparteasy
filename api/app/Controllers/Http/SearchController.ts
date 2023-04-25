import BaseController from 'App/Controllers/Http/BaseController'
import SearchService from 'App/Services/SearchService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchController extends BaseController {
  protected async index() {
    return await SearchService.getAll()
  }

  protected async show({ params }: HttpContextContract) {
    return await SearchService.getById(params.id)
  }

  protected async create() {
    return await SearchService.create()
  }

  protected async delete({ params }: HttpContextContract) {
    return await SearchService.delete(params.id)
  }
}
