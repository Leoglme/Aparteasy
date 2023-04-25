import LocationService from 'App/Services/LocationService'
import MailService from 'App/Services/MailService'
import MailValidator from 'App/Validators/MailValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LocationController {
  protected async send({ request }: HttpContextContract) {
    const payload = await request.validate(MailValidator)

    return await MailService.send(payload)
  }
  protected async sendMany() {
    return await LocationService.create()
  }
}
