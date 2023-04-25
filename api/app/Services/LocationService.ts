import BaseService from 'App/Services/BaseService'
import LocationValidator from 'App/Validators/LocationValidator'
import Location from 'App/Models/Location'

export default class LocationService extends BaseService {
  public static async create() {
    const data = await super.request.validate(LocationValidator)
    const existingLocation = await Location.findBy('address', data.address)
    if (existingLocation) return existingLocation
    return await Location.create(data)
  }
}
