import BaseService from 'App/Services/BaseService'
import Event from '@ioc:Adonis/Core/Event'
import LocationService from 'App/Services/LocationService'
import Property from 'App/Models/Property'
import PropertyValidator from 'App/Validators/PropertyValidator'
import SearchService from 'App/Services/SearchService'

export default class PropertyService extends BaseService {
  public static async getSearchProperties(searchId: number): Promise<Property[] | null> {
    const search = await SearchService.getById(searchId)
    if (!search) return null
    return await Property.query()
      .where('search_id', search?.id)
      .where('is_deleted', false)
      .preload('location')
      .preload('statuses')
      .preload('ratings')
      .exec()
  }

  public static async getById(id: number, searchId: number) {
    return await Property.query()
      .preload('location')
      .preload('statuses')
      .preload('ratings')
      .where('id', id)
      .where('search_id', searchId)
      .where('is_deleted', false)
      .firstOrFail()
  }

  public static async create() {
    const data = await super.request.validate(PropertyValidator)
    const location = await LocationService.create(data.location)
    const property = await Property.create({ ...data, location_id: location.id })
    return await this.getById(property.id, property.search_id)
  }

  public static async update(id: number, searchId: number) {
    const data = await super.request.validate(PropertyValidator)
    const property = await Property.findOrFail(id)
    if (property.is_deleted) {
      super.response.notFound()
    }
    property.merge(data)
    await property.save()
    return await this.getById(property.id, searchId)
  }

  public static async delete(id: number, searchId: number) {
    const property = await this.getById(id, searchId)
    property.is_deleted = true
    await property.save()
    await Event.emit('notify:success', `La propriété a été supprimée avec succès !`)
    return super.response.noContent()
  }
}
