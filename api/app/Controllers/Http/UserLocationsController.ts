import BaseController from 'App/Controllers/Http/BaseController'
import UserLocationService from 'App/Services/UserLocationService'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserLocationValidator from 'App/Validators/UserLocationValidator'

export default class UserLocationsController extends BaseController {
  public async getAllByUserId() {
    return await UserLocationService.getAllByUserId()
  }

  public async update({ request }: HttpContextContract) {
    const { locations } = await request.validate(UserLocationValidator)
    return await UserLocationService.update(locations)
  }
}
