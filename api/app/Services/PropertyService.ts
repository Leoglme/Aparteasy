import BaseService from 'App/Services/BaseService'
import LocationService from 'App/Services/LocationService'
import Property, { TravelTimes } from 'App/Models/Property'
import PropertyValidator from 'App/Validators/PropertyValidator'
import SearchService from 'App/Services/SearchService'
import type { PropertyRatingWithUser } from 'App/Models/PropertyRating'
import UserLocationService from 'App/Services/UserLocationService'
import UserLocation from 'App/Models/UserLocation'

interface ServiceProperty extends Omit<Property, 'ratings'> {
  average_ratings?: number
  ratings: PropertyRatingWithUser[]
}

type UserLocationWithTravelTime = {
  userLocation: UserLocation
  travelTimes: TravelTimes
}

interface ServicePropertyWithLocations extends ServiceProperty {
  locations: Array<UserLocationWithTravelTime>
}

export default class PropertyService extends BaseService {
  public static async getAll(): Promise<Property[]> {
    return await Property.query()
      .where('is_deleted', false)
      .preload('location')
      .preload('ratings')
      .orderBy('created_at', 'desc')
      .exec()
  }
  public static async getSearchProperties(searchId: number): Promise<Property[] | null> {
    const search = await SearchService.getById(searchId)
    if (!search) return null

    return await Property.query()
      .where('search_id', search?.id)
      .where('is_deleted', false)
      .preload('location')
      .preload('ratings')
      .orderBy('created_at', 'desc')
      .exec()
  }

  public static async findById(id: number, searchId: number) {
    const property = await this.getById(id, searchId)

    const userLocations = await UserLocationService.getAllByUserId()
    if (!property) return super.response.notFound()

    let locations: Array<UserLocationWithTravelTime> = []

    if (userLocations) {
      locations = await Promise.all(
        userLocations.map(async (location) => {
          const travelTimes = await property.getTravelTimes({
            lat: location.location.lat,
            lng: location.location.lng,
          })
          return {
            userLocation: location,
            travelTimes,
          }
        })
      )
    }

    const propertyObj: Property = property.toJSON() as Property

    const ratings: PropertyRatingWithUser[] = propertyObj.ratings.map((rating) => {
      return { ...rating, isUser: rating.user_id === super.auth.user?.id }
    })

    return {
      ...propertyObj,
      locations,
      ratings,
      average_ratings: property.averageRating,
    } as ServicePropertyWithLocations
  }

  public static async getById(id: number, searchId: number) {
    return await Property.query()
      .preload('location')
      .preload('ratings', (query) => query.preload('user'))
      .where('id', id)
      .where('search_id', searchId)
      .where('is_deleted', false)
      .firstOrFail()
  }

  public static async create(searchId: number) {
    const data = await super.request.validate(PropertyValidator)
    const location = await LocationService.create(data.location)
    const property = await Property.create({
      ...data,
      location_id: location.id,
      search_id: searchId,
    })
    await super.sendPrivateSuccessNotification(`La propriété a été créée avec succès !`)
    return await this.getById(property.id, searchId)
  }

  public static async update(id: number, searchId: number) {
    const data = await super.request.validate(PropertyValidator)
    const property = await Property.findOrFail(id)
    if (property.is_deleted) {
      super.response.notFound()
    }
    property.merge(data)
    await property.save()
    await super.sendPrivateSuccessNotification(`La propriété a été modifiée avec succès !`)
    return await this.getById(property.id, searchId)
  }

  public static async delete(id: number, searchId: number) {
    const property = await this.getById(id, searchId)
    if (!property) {
      return super.response.notFound()
    }
    property.is_deleted = true
    await property.save()
    await super.sendPrivateSuccessNotification(`La propriété a été supprimée avec succès !`)
    return super.response.noContent()
  }
}
