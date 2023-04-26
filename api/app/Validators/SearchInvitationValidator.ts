import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchInvitationValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    receiverIds: schema.array().members(schema.string({ trim: true })),
  })
}
