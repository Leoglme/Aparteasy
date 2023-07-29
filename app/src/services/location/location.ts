import axios from 'axios'
import { API_URL } from '@/env'
import type { Location, LocationCommand } from '@/services/location/location.model'

export class LocationService {
  public static locationApiUrl = `${API_URL}/api/location`
  static async create(location: LocationCommand): Promise<{ data: Location }> {
    return await axios.post(this.locationApiUrl, location)
  }
}
