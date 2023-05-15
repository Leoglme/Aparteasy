import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { locationSchema } from 'App/Validators/LocationValidator'

export default class PropertyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [rules.maxLength(255)]),
    url: schema.string({}, [rules.required(), rules.url(), rules.maxLength(2048)]),
    price: schema.number([rules.required(), rules.unsigned(), rules.range(0, 1000000)]),
    amount_of_charges: schema.number.optional([rules.unsigned(), rules.range(0, 1000000)]),
    number_of_rooms: schema.number([rules.required(), rules.unsigned(), rules.range(0, 50)]),
    surface_area: schema.number([rules.required(), rules.unsigned(), rules.range(0, 10000)]),
    location: schema.object().members(locationSchema),
    availability_date: schema.date.optional({ format: 'iso' }),
    quality_rating: schema.number.optional([rules.unsigned(), rules.range(1, 5)]),
    comment: schema.string.optional(),
    available: schema.boolean.optional(),
    contacted: schema.boolean.optional(),
  })
}
