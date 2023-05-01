import Chance from 'chance'
import Property from 'App/Models/Property'
import PropertyRating from 'App/Models/PropertyRating'
import User from 'App/Models/User'
import SearchService from 'App/Services/SearchService'
import PropertyStatus from 'App/Models/PropertyStatus'
import Status from 'App/Models/Status'

const chance = new Chance()

interface Rating {
  userId: number
  rating: number
}

async function generateRatings(users: User[]): Promise<Rating[]> {
  const ratings: Rating[] = []
  const n = chance.integer({ min: 0, max: users.length })
  for (let i = 0; i < n; i++) {
    const user = chance.pickone(users)
    const rating = chance.integer({ min: 1, max: 5 })
    ratings.push({
      userId: user.id,
      rating,
    })
  }
  return ratings
}

export async function addRatingsToProperties(properties: Property[]) {
  for (const property of properties) {
    const search = await SearchService.getById(property.search_id)
    const users = search?.users

    if (users) {
      /*Ratings*/
      const ratings = await generateRatings(users)
      for (const { userId, rating } of ratings) {
        await PropertyRating.create({
          user_id: userId,
          property_id: property.id,
          rating,
        })
      }
    }
    /*Status*/
    const numStatuses = chance.integer({ min: 0, max: 2 })
    for (let i = 0; i < numStatuses; i++) {
      const statuses = await Status.all()
      const status = chance.pickone(statuses)
      await PropertyStatus.create({
        property_id: property.id,
        status_id: status.id,
        is_active: chance.bool(),
      })
    }
  }
}
