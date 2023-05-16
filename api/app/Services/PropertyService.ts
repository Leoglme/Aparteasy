import BaseService from 'App/Services/BaseService'
import LocationService from 'App/Services/LocationService'
import Property, { TravelTimes } from 'App/Models/Property'
import PropertyValidator from 'App/Validators/PropertyValidator'
import SearchService from 'App/Services/SearchService'
import type { PropertyRatingWithUser } from 'App/Models/PropertyRating'

interface ServiceProperty extends Omit<Property, 'ratings'> {
  travelTimes: TravelTimes
  average_ratings?: number
  ratings: PropertyRatingWithUser[]
}

export default class PropertyService extends BaseService {
  public static async getSearchProperties(searchId: number): Promise<ServiceProperty[] | null> {
    const search = await SearchService.getById(searchId)
    if (!search) return null

    const properties = await Property.query()
      .where('search_id', search?.id)
      .where('is_deleted', false)
      .preload('location')
      .preload('ratings')
      .orderBy('created_at', 'desc')
      .exec()

    return await Promise.all(
      properties.map(async (property) => {
        let travelTimes = { driving: 0, transit: 0, walking: 0 }
        try {
          travelTimes = await property.getTravelTimes({
            lat: search.location.lat,
            lng: search.location.lng,
          })
        } catch (e) {
          console.log(e)
        }
        return { ...property.toJSON(), travelTimes } as ServiceProperty
      })
    )
  }

  public static async findById(id: number, searchId: number) {
    const property = await this.getById(id, searchId)

    const search = await SearchService.getById(searchId)
    if (!search || !property) return super.response.notFound()

    const travelTimes = await property.getTravelTimes({
      lat: search.location.lat,
      lng: search.location.lng,
    })

    const propertyObj: Property = property.toJSON() as Property

    const ratings: PropertyRatingWithUser[] = propertyObj.ratings.map((rating) => {
      return { ...rating, isUser: rating.user_id === super.auth.user?.id }
    })

    return {
      ...propertyObj,
      travelTimes,
      ratings,
      average_ratings: property.averageRating,
    } as ServiceProperty
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
