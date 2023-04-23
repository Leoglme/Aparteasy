import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SocialAuthService from 'App/Services/SocialAuthService'
import BaseController from 'App/Controllers/Http/BaseController'
import Event from '@ioc:Adonis/Core/Event'

export default class SocialAuthController extends BaseController {
  public redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, params }: HttpContextContract) {
    const socialUser = await ally.use(params.provider).user()

    const user = await SocialAuthService.findOrCreateUser(socialUser, params.provider)
    const token = await SocialAuthService.generateToken(user, params.provider)
    await Event.emit('login', user)
    return super.send({ token: token.toJSON(), user: super.auth.user })
  }
}
