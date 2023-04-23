import SocialAuthService from 'App/Services/SocialAuthService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SocialAuthController {
  public redirect({ ally, params }: HttpContextContract) {
    return ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, auth, response }: HttpContextContract) {
    const socialUser = await ally.use(params.provider).user()

    await new SocialAuthService(socialUser, params.provider)
      .onFindOrCreate(async (user) => {
        const token = await auth.login(user, {
          name: `${params.provider} Login Access Token`,
          expiresIn: '7days',
        })
        return response.send(token.toJSON())
      })
      .catch(() => {
        return response
          .status(409)
          .send({ message: 'An account already exists with this email address' })
      })
  }
}
