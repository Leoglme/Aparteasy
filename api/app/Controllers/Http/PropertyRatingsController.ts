import BaseController from 'App/Controllers/Http/BaseController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PropertyRatingsService from 'App/Services/PropertyRatingsService'

export default class PropertyController extends BaseController {
  protected async update({ params }: HttpContextContract) {
    return await PropertyRatingsService.update(params.id)
  }
}
