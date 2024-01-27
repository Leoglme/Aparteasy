import BaseController from 'App/Controllers/Http/BaseController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PropertyService from 'App/Services/PropertyService'

export default class PropertyController extends BaseController {
  protected async index({}: HttpContextContract) {
    return await PropertyService.getAll()
  }
  protected async allBySearchId({ params }: HttpContextContract) {
    return await PropertyService.getSearchProperties(params.search_id)
  }

  protected async show({ params }: HttpContextContract) {
    return await PropertyService.findById(params.id, params.search_id)
  }

  protected async create({ params }: HttpContextContract) {
    return await PropertyService.create(params.search_id)
  }
  protected async update({ params }: HttpContextContract) {
    return await PropertyService.update(params.id, params.search_id)
  }

  protected async delete({ params }: HttpContextContract) {
    return await PropertyService.delete(params.id, params.search_id)
  }
}
