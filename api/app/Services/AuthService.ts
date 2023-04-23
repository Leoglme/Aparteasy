import BaseService from 'App/Services/BaseService'
import RegisterValidator from 'App/Validators/RegisterValidator'
import User from 'App/Models/User'
import Event from '@ioc:Adonis/Core/Event'

export default class AuthService extends BaseService {
  public static async signup() {
    const data = await super.request.validate(RegisterValidator)
    const user = await User.create(data)
    const token = await this.generateToken(data.email, data.password)
    await Event.emit('new:user', user)
    return super.response.created({ token: token.toJSON(), user: user.serialize() })
  }
  public static async login() {
    const password = await super.request.input('password')
    const email = await super.request.input('email')

    const token = await this.generateToken(email, password)

    const user = super.auth.user
    delete user?.password
    await Event.emit('login', user)
    return super.send({ token: token.toJSON(), user })
  }

  public static async logout() {
    await super.auth.use('api').revoke()
    return super.auth.use('api')
  }

  // Auth status and information
  public static async status() {
    await super.auth.use('api').authenticate()
    const auth = super.auth.use('api')
    delete auth?.user?.password
    return auth
  }
  private static async generateToken(email: string, password: string) {
    return await super.auth.use('api').attempt(email, password, {
      name: 'Auth Login Access Token',
      expiresIn: '7days',
    })
  }
}
