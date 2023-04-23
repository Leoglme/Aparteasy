import User from 'App/Models/User'
import type { AllyUserContract, GoogleToken, SocialProviders } from '@ioc:Adonis/Addons/Ally'
import Event from '@ioc:Adonis/Core/Event'

export default class SocialAuthService {
  private findOrCreateHandler: any
  private socialUser: AllyUserContract<GoogleToken>
  private readonly provider: keyof SocialProviders

  constructor(socialUser: AllyUserContract<GoogleToken>, provider: keyof SocialProviders) {
    this.socialUser = socialUser
    this.provider = provider
  }

  public onFindOrCreate(cb: any) {
    this.findOrCreateHandler = cb
    return this
  }

  public async exec(): Promise<void> {
    let user = await this.findUser()

    if (!user) {
      user = await this.createUser()
      await Event.emit('new:user', user)
    }

    await this.findOrCreateHandler(user)
  }

  private findUser() {
    return User.query()
      .where('oauthProviderId', this.socialUser.id)
      .where('oauthProviderName', this.provider)
      .first()
  }

  private createUser() {
    return User.create({
      name: this.socialUser.name,
      email: this.socialUser.email ?? undefined,
      oauthProviderId: this.socialUser.id,
      oauthProviderName: this.provider,
    })
  }

  /**
   * Implementation of `catch` for the promise API
   */
  public catch(reject: any): any {
    return this.exec().catch(reject)
  }

  /**
   * Required when Promises are extended
   */
  public get [Symbol.toStringTag]() {
    return this.constructor.name
  }
}
