import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MailValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    message: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.email()]),
  })
}
