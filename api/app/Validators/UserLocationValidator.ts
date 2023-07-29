import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { locationSchema } from 'App/Validators/LocationValidator'

export default class UserLocationValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    locations: schema.array().members(
      schema.object().members({
        name: schema.string.optional({ trim: true }),
        location: schema.object().members(locationSchema),
      })
    ),
  })
}
