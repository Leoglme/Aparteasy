import BaseService from 'App/Services/BaseService'
import LocationService from 'App/Services/LocationService'
import Property from 'App/Models/Property'
import PropertyValidator from 'App/Validators/PropertyValidator'
import SearchService from 'App/Services/SearchService'
import { GoogleMapsService } from 'App/Services/GoogleMapsService'

export default class PropertyService extends BaseService {
  public static async getSearchProperties(searchId: number): Promise<Property[] | null> {
    const search = await SearchService.getById(searchId)
    if (!search) return null

    const properties = await Property.query()
      .where('search_id', search?.id)
      .where('is_deleted', false)
      .preload('location')
      .preload('ratings')
      .exec()

    try {
      const travelTimes = await GoogleMapsService.getTravelTimes(
        { lat: search.location.lat, lng: search.location.lng },
        { lat: properties[0].location.lat, lng: properties[0].location.lng },
        ['driving', 'walking', 'transit']
      )
      console.log({ lat: search.location.lat, lng: search.location.lng })
      console.log({ lat: properties[0].location.lat, lng: properties[0].location.lng })
      console.log(travelTimes)
    } catch (e) {
      return e
    }

    return properties
  }

  public static async getById(id: number, searchId: number) {
    return await Property.query()
      .preload('location')
      .preload('ratings')
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
    property.is_deleted = true
    await property.save()
    await super.sendPrivateSuccessNotification(`La propriété a été supprimée avec succès !`)
    return super.response.noContent()
  }
}
