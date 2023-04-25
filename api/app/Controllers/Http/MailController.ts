import MailService from 'App/Services/MailService'
import MailValidator from 'App/Validators/MailValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MailsValidator from 'App/Validators/MailsValidator'

export default class MailController {
  protected async send({ request }: HttpContextContract) {
    const payload = await request.validate(MailValidator)
    return await MailService.send({
      email: payload.email,
      payload,
      subject: 'test mail',
    })
  }
  protected async sendMany({ request }: HttpContextContract) {
    const payload = await request.validate(MailsValidator)
    return await MailService.sendMany({
      emails: payload.emails,
      payload,
      subject: 'test mails',
    })
  }
}
