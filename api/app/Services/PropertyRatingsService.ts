import BaseService from 'App/Services/BaseService'
import PropertyRating from 'App/Models/PropertyRating'
import PropertyRatingsValidator from 'App/Validators/PropertyRatingsValidator'

export default class PropertyRatingsService extends BaseService {
  public static async update(propertyId: number) {
    const data = await super.request.validate(PropertyRatingsValidator)

    // Try to find an existing rating
    let rating = await PropertyRating.query()
      .where('property_id', propertyId)
      .where('user_id', super.auth.user!.id)
      .first()

    if (rating) {
      // Update the existing rating
      rating.merge({ rating: data.rating })
      await rating.save()
    } else {
      // Create a new rating
      rating = await PropertyRating.create({
        property_id: propertyId,
        user_id: super.auth.user!.id,
        rating: data.rating,
      })
    }

    await super.sendPrivateSuccessNotification(`Votre note à bien été prise en compte.`)
    return { ...rating.toJSON(), isUser: rating.user_id === super.auth.user!.id }
  }
}
