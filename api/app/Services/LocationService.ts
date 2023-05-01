import BaseService from 'App/Services/BaseService'
import Location from 'App/Models/Location'

export type LocationCommand = {
  address: string
  city: string
  region: string
  country: string
  lat: number
  lng: number
}
export default class LocationService extends BaseService {
  public static async create(location: LocationCommand) {
    const existingLocation = await Location.findBy('address', location.address)
    if (existingLocation) return existingLocation
    return await Location.create(location)
  }
}
