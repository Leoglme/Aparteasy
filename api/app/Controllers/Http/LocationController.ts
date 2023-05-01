import BaseController from 'App/Controllers/Http/BaseController'
import LocationService from 'App/Services/LocationService'
import LocationValidator from 'App/Validators/LocationValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LocationController extends BaseController {
  protected async create({ request }: HttpContextContract) {
    const data = await request.validate(LocationValidator)
    return await LocationService.create(data)
  }
}
