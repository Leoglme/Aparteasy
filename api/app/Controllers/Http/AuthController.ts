import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  protected async signup({ request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)
    const user = await User.create(data)
    return response.created(user)
  }

  protected async login({ request, auth }: HttpContextContract) {
    const password = await request.input('password')
    const email = await request.input('email')

    const token = await auth.use('api').attempt(email, password, {
      name: 'Auth Login Access Token',
      expiresIn: '7days',
    })
    return { token: token.toJSON(), user: auth.user }
  }

  protected async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return auth.use('api')
  }

  // Auth status and information
  protected async status({ auth }: HttpContextContract) {
    await auth.use('api').authenticate()
    return auth.use('api')
  }
}
