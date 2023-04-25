import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SocialAuthService from 'App/Services/SocialAuthService'
import BaseController from 'App/Controllers/Http/BaseController'
import Event from '@ioc:Adonis/Core/Event'
import Env from '@ioc:Adonis/Core/Env'

export default class SocialAuthController extends BaseController {
  public redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, response }: HttpContextContract) {
    const socialUser = await ally.use(params.provider).user()

    const user = await SocialAuthService.findOrCreateUser(socialUser, params.provider)
    const token = await SocialAuthService.generateToken(user, params.provider)
    await Event.emit('login', user)

    const redirectUrl = `${Env.get('APP_URL')}/oauth2?token=${token.token}`
    return response.redirect(redirectUrl)
  }
}
