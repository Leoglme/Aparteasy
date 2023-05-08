import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SocialAuthService from 'App/Services/SocialAuthService'
import BaseController from 'App/Controllers/Http/BaseController'
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'

export default class SocialAuthController extends BaseController {
  public redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, response }: HttpContextContract) {
    const socialUser = await ally.use(params.provider).user()

    const userOrError = await SocialAuthService.findOrCreateUser(socialUser, params.provider)

    if ('error' in userOrError) {
      const redirectUrl = `${Env.get('APP_URL')}/login`
      response.plainCookie('error_message', userOrError.error, {
        expires: DateTime.local().plus({ minutes: 5 }).toJSDate(),
        httpOnly: false,
        sameSite: true,
      })
      response.redirect(redirectUrl)
      return
    }

    const token = await SocialAuthService.generateToken(userOrError, params.provider)

    const redirectUrl = `${Env.get('APP_URL')}/oauth2?token=${token.token}`
    response.redirect(redirectUrl)
    setTimeout(async () => {
      await super.sendPrivateSocketEvent({ user: socialUser }, 'login')
    }, 2500)
  }
}
