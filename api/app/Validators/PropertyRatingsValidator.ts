import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PropertyRatingsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    rating: schema.number.optional([rules.unsigned(), rules.range(1, 5)]),
  })
}
