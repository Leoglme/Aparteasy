import User from 'App/Models/User'
import type { AllyUserContract, GoogleToken, SocialProviders } from '@ioc:Adonis/Addons/Ally'
import BaseService from 'App/Services/BaseService'

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
    let user = await this.findUser(socialUser, provider)

    if (!user?.oauthProviderName) {
      const message = `This email is already in use, log in with your email and password`;
      return { error: message }
    }

    if (!user) {
      user = await this.createUser(socialUser, provider)
    }

    return user
  }

  private static findUser(
    socialUser: AllyUserContract<GoogleToken>,
    provider: keyof SocialProviders
  ) {
    return User.query()
      .where('oauthProviderId', socialUser.id)
      .where('oauthProviderName', provider)
      .first()
  }

  private static async createUser(
    socialUser: AllyUserContract<GoogleToken>,
    provider: keyof SocialProviders
  ) {
    return User.create({
      name: socialUser.name,
      email: socialUser.email ?? undefined,
      oauthProviderId: socialUser.id,
      oauthProviderName: provider,
    })
  }
}
