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

    // Create new locations and user locations
    for (const dataItem of data) {
      // Create or find location
      const location = await LocationService.create(dataItem.location)

      // Create new user location
      await UserLocation.create({
        name: dataItem.name ?? null,
        location_id: location.id,
        user_id: userId,
      })
    }

    // If new locations were created successfully, delete old ones
    if (currentUserLocations) {
      for (const oldLocation of currentUserLocations) {
        await oldLocation.delete()
      }
    }

    await super.sendPrivateSuccessNotification('Les lieux ont été mis à jour !')

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
