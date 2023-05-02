import BaseService from 'App/Services/BaseService'
import AuthService from 'App/Services/AuthService'
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
      .preload('location')
      .preload('statuses')
      .preload('ratings')
      .exec()
  }

  public static async getById(id: number) {
    return await Property.query()
      .preload('location')
      .preload('statuses')
      .preload('ratings')
      .where('id', id)
      .firstOrFail()
  }

  public static async create() {
    const data = await super.request.validate(PropertyValidator)
    if (!super.auth.user?.id) {
      AuthService.unauthorized()
      return
    }
    const location = await LocationService.create(data.location)
    const property = await Property.create({ ...data, location_id: location.id })
    return await this.getById(property.id)
  }

  public static async delete(id: number) {
    await Property.findOrFail(id).then((property) => property.delete())
    await Event.emit('notify:success', `La propriété a été supprimée avec succès !`)
    return super.response.noContent()
  }
}
