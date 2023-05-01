import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { locationSchema } from 'App/Validators/LocationValidator'

export default class PropertyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    url: schema.string({}, [rules.required(), rules.url(), rules.maxLength(2048)]),
    price: schema.number([rules.required(), rules.unsigned(), rules.range(1, 1000000)]),
    charges: schema.number([rules.required(), rules.unsigned(), rules.range(1, 1000000)]),
    availability_date: schema.date({ format: 'iso' }, [rules.required()]),
    location: schema.object().members(locationSchema),
    number_of_bedrooms: schema.number([rules.required(), rules.unsigned(), rules.range(1, 10)]),
    surface_area: schema.number([rules.required(), rules.unsigned(), rules.range(1, 10000)]),
    quality_rating: schema.number([rules.required(), rules.unsigned(), rules.range(1, 5)]),
    transport_time: schema.string({}, [rules.required(), rules.maxLength(255)]),
    search_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'searches', column: 'id' }),
    ]),
  })
}
