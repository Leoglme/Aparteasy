import Chance from 'chance'
import Location from 'App/Models/Location'
import { DateTime } from 'luxon'
import Search from 'App/Models/Search'
import Property from 'App/Models/Property'
import { addRatingsToProperties } from 'Database/fakeDatas/propertyRatings'

const chance = new Chance()

interface PropertyType {
  url: string
  price: number
  amount_of_charges: number
  availability_date: DateTime
  location_id: number
  number_of_rooms: number
  surface_area: number
  quality_rating: number
  search_id: number
  contacted: boolean
  available: boolean
  comment: string | null
  name: string | null
}

export async function generateProperties(searchId: number, max = 20): Promise<PropertyType[]> {
  const n = chance.integer({ min: 5, max })
  const locations = await Location.all()
  const properties: PropertyType[] = []
  for (let i = 0; i < n; i++) {
    const url = chance.url()
    const price = chance.integer({ min: 100, max: 1500 })
    const amountOfCharges = chance.integer({ min: 10, max: 200 })
    const availabilityDate = DateTime.fromJSDate(new Date(chance.date({ year: 2023 })))
    const numberOfBedrooms = chance.integer({ min: 1, max: 5 })
    const surfaceArea = chance.integer({ min: 30, max: 150 })
    const qualityRating = chance.floating({ min: 1, max: 5 })
    const location = chance.pickone(locations)
    const contacted = chance.bool()
    const available = chance.bool()
    const shouldAddComment = chance.bool({ likelihood: 75 })
    const shouldAddName = chance.bool({ likelihood: 75 })
    const comment = shouldAddComment ? chance.sentence({ words: 10 }) : null
    const name = shouldAddName ? chance.name() : null
    properties.push({
      name,
      url,
      price,
      amount_of_charges: amountOfCharges,
      availability_date: availabilityDate,
      location_id: location.id,
      number_of_rooms: numberOfBedrooms,
      surface_area: surfaceArea,
      quality_rating: qualityRating,
      search_id: searchId,
      contacted,
      available,
      comment,
    })
  }
  return properties
}

export async function addPropertiesToSearches(searches: Search[]) {
  for (const search of searches) {
    const properties = await generateProperties(search.id)
    const createdProperties = await Property.createMany(properties)
    await addRatingsToProperties(createdProperties)
  }
}
