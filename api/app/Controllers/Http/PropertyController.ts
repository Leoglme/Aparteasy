import BaseController from 'App/Controllers/Http/BaseController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PropertyService from 'App/Services/PropertyService'

export default class PropertyController extends BaseController {
  protected async index({ params }: HttpContextContract) {
    return await PropertyService.getSearchProperties(params.id)
  }

  protected async show({ params }: HttpContextContract) {
    return await PropertyService.getById(params.id)
  }

  protected async create() {
    return await PropertyService.create()
  }

  protected async delete({ params }: HttpContextContract) {
    return await PropertyService.delete(params.id)
  }
}
