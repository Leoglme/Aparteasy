import BaseService from 'App/Services/BaseService'
import RegisterValidator from 'App/Validators/RegisterValidator'
import User from 'App/Models/User'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { UserService } from 'App/Services/UserService'
import FakeService from 'App/Services/FakeService'
import PasswordResetTokenService from 'App/Services/PasswordResetTokenService'
import MailService from 'App/Services/MailService'
import appInfos from 'Config/app-infos'
import { DateTime } from 'luxon'

export default class AuthService extends BaseService {
  public static async signup() {
    const data = await super.request.validate(RegisterValidator)
    const avatarUrl = FakeService.generateDiceBearURL(data.name)
    const user = await User.create({ ...data, avatarUrl })
    const token = await this.generateToken(data.email, data.password)
    await super.sendPrivateSocketEvent({ user }, 'new:user')
    return super.response.created({ token: token.toJSON(), user: user.serialize() })
  }

  public static async login() {
    const password = await super.request.input('password')
    const email = await super.request.input('email')
    const findUserByEmail = await UserService.findByEmail(email)

    if (findUserByEmail?.oauthProviderName) {
      const message = `You must sign in with your ${findUserByEmail?.oauthProviderName} account`
      return super.badRequest(message)
    }

    const token = await this.generateToken(email, password)

    const user = super.auth.user
    delete user?.password
    await super.sendPrivateSocketEvent({ user }, 'login')
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

  // Send password reset link
  public static async forgotPassword() {
    const email: string | undefined = await super.request.input('email')
    if (!email) {
      return super.badRequest('Une adresse email est requise')
    }
    const user = await UserService.findByEmail(email)
    if (!user) {
      return super.badRequest('Aucun utilisateur trouvé avec cette adresse email')
    }
    if (user.oauthProviderName) {
      return super.badRequest(
        `Vous devez vous connecter avec votre compte ${user.oauthProviderName}`
      )
    }

    const oldPasswordResetToken = await PasswordResetTokenService.findByUserId(user.id)

    if (oldPasswordResetToken) {
      await PasswordResetTokenService.delete(oldPasswordResetToken.id)
    }

    const passwordResetToken = await PasswordResetTokenService.create(user)
    await this.sendForgotPasswordEmail(user, passwordResetToken.token)
    const message = `Un email pour réinitialiser votre mot de passe vous a été envoyé`
    await super.sendPrivateSuccessNotification(message)
    return super.response.ok(message)
  }

  public static async resetPassword() {
    const token: string | undefined = await super.request.input('token')
    const password: string | undefined = await super.request.input('password')

    if (!token) {
      return this.unauthorized()
    }
    if (!password) {
      return super.badRequest('Mot de passe requis')
    }
    const passwordResetToken = await PasswordResetTokenService.findByToken(token)
    if (!passwordResetToken) {
      return super.badRequest('Token invalide')
    }

    if (passwordResetToken.expires_at < DateTime.local()) {
      return super.badRequest(
        'Token expiré, veuillez demander une nouvelle réinitialisation de mot de passe'
      )
    }
    const user = await User.find(passwordResetToken.user_id)
    if (!user) {
      return super.badRequest('Utilisateur introuvable')
    }
    const decodedToken = await PasswordResetTokenService.decryptResetPasswordToken(token)

    if (decodedToken !== user.email) {
      return this.unauthorized()
    }

    await user.merge({ password }).save()
    await PasswordResetTokenService.delete(passwordResetToken.id)
    const message = `Votre mot de passe a bien été modifié`
    await super.sendPrivateSuccessNotification(message)
    return super.response.ok(message)
  }

  protected static async sendForgotPasswordEmail(user: User, token: string) {
    await MailService.send({
      email: user.email,
      subject: `Réinitialisation de votre mot de passe ${appInfos.name}`,
      viewPath: 'emails/forgot-password',
      payload: {
        url: `${appInfos.url}/reset-password?resetPasswordToken=${token}`,
        username: user.name,
      },
    })
  }

  private static async generateToken(email: string, password: string) {
    return await super.auth.use('api').attempt(email, password, {
      name: 'Auth Login Access Token',
      expiresIn: '7days',
    })
  }

  public static unauthorized() {
    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      'unauthorized'
    )
  }
}
