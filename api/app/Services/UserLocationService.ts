import BaseService from 'App/Services/BaseService'
import UserLocation from 'App/Models/UserLocation'
import AuthService from 'App/Services/AuthService'
import LocationService from 'App/Services/LocationService'
import type { LocationCommand } from 'App/Services/LocationService'

interface UserLocationData {
  name?: string
  location: LocationCommand
}

export default class UserLocationService extends BaseService {
  public static async update(data: UserLocationData[]) {
    const userId = super.auth.user?.id
    if (!userId) {
      AuthService.unauthorized()
      return
    }

    // Get current user_locations
    const currentUserLocations = await this.getAllByUserId()

    // Process each data item
    for (const dataItem of data) {
      // Create or find location
      const location = await LocationService.create(dataItem.location)

      // Check if user location already exists
      const existingUserLocation = currentUserLocations?.find(
        (userLocation) =>
          userLocation.name === dataItem.name && userLocation.location_id === location.id
      )

      if (existingUserLocation) {
        // If user location already exists and is the same as the new one, do nothing
        if (
          existingUserLocation.name === dataItem.name &&
          existingUserLocation.location_id === location.id
        ) {
          continue
        }

        // If user location exists but is different, update it
        existingUserLocation.merge({ name: dataItem.name, location_id: location.id })
        await existingUserLocation.save()
      } else {
        // If user location does not exist, create it
        await UserLocation.create({
          name: dataItem.name ?? null,
          location_id: location.id,
          user_id: userId,
        })
      }
    }

    return this.getAllByUserId()
  }

  public static async getAllByUserId() {
    const user = super.auth.user
    if (!user) {
      AuthService.unauthorized()
      return
    }
    return await UserLocation.query()
      .where('user_id', user.id)
      .preload('location')
      .orderBy('created_at', 'desc')
      .exec()
  }
}
