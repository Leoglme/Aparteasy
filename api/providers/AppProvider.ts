import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { GoogleMapsService } from 'App/Services/GoogleMapsService'
import Env from '@ioc:Adonis/Core/Env'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    GoogleMapsService.init(Env.get('GOOGLE_API_KEY'))
  }

  public async ready() {
    // App is ready
    if (this.app.environment === 'web') {
      await import('../start/socket')
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
