import axios from 'axios'
import { API_URL } from '@/env'
import type { UserLocation, UserLocationCommand } from '@/services/userLocation/userLocation.model'

export class UserLocationService {
  public static userLocationApiUrl = `${API_URL}/api/user-locations`

  static async all(): Promise<{ data: UserLocation[] | never[] }> {
    return await axios.get(this.userLocationApiUrl)
  }

  static async update(userLocation: UserLocationCommand[]): Promise<{ data: UserLocation[] }> {
    return await axios.put(this.userLocationApiUrl, { locations: userLocation })
  }
}
