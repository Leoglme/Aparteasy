import BaseController from 'App/Controllers/Http/BaseController'
import LocationService from 'App/Services/LocationService'

export default class LocationController extends BaseController {
  protected async create() {
    return await LocationService.create()
  }
}
