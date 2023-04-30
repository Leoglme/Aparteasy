import User from 'App/Models/User'
import type { AllyUserContract, GoogleToken, SocialProviders } from '@ioc:Adonis/Addons/Ally'
import BaseService from 'App/Services/BaseService'
import { UserService } from 'App/Services/UserService'
import FakeService from 'App/Services/FakeService'

export default class SocialAuthService extends BaseService {
  public static async generateToken(user: User, provider: keyof SocialProviders) {
    return await super.auth.login(user, {
      name: `${provider} Login Access Token`,
      expiresIn: '7days',
    })
  }
  public static async findOrCreateUser(
    socialUser: AllyUserContract<GoogleToken>,
    provider: keyof SocialProviders
  ): Promise<User | { error: string }> {
    if (!socialUser?.email) {
      const message = `No {provider} account with this email address was found`
      return { error: message }
    }

    let user = await UserService.findByEmail(socialUser.email)

    if (!user) {
      user = await this.createUser(socialUser, provider)
    }

    if (!user?.oauthProviderName) {
      const message = `This email is already in use, log in with your email and password`
      return { error: message }
    }

    return user
  }

  private static async createUser(
    socialUser: AllyUserContract<GoogleToken>,
    provider: keyof SocialProviders
  ) {
    return User.create({
      name: socialUser.name,
      email: socialUser.email ?? undefined,
      avatarUrl: socialUser.avatarUrl ?? FakeService.generateDiceBearURL(socialUser.name),
      oauthProviderId: socialUser.id,
      oauthProviderName: provider,
    })
  }
}
