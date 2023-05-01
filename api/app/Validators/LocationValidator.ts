import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export const locationSchema = {
  address: schema.string({ trim: true }, [rules.required()]),
  city: schema.string({ trim: true }, [rules.required()]),
  region: schema.string({ trim: true }, [rules.required()]),
  country: schema.string({ trim: true }, [rules.required()]),
  lat: schema.number([rules.required(), rules.range(-90, 90)]),
  lng: schema.number([rules.required(), rules.range(-180, 180)]),
}

export default class LocationValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create(locationSchema)
}
