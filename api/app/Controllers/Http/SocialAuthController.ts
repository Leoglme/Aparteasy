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

    const userOrError = await SocialAuthService.findOrCreateUser(socialUser, params.provider)

    if ('error' in userOrError) {
      const redirectUrl = `${Env.get('APP_URL')}/login`
      response.redirect(redirectUrl)
      setTimeout(async () => {
        await Event.emit('notify:error', userOrError.error)
      }, 2500)
      return
    }

    const token = await SocialAuthService.generateToken(userOrError, params.provider)
    await Event.emit('login', userOrError)

    const redirectUrl = `${Env.get('APP_URL')}/oauth2?token=${token.token}`
    response.redirect(redirectUrl)
    setTimeout(async () => {
      await Event.emit('login', userOrError)
    }, 2500)
  }
}
