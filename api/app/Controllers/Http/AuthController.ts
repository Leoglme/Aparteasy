import AuthService from 'App/Services/AuthService'
import BaseController from 'App/Controllers/Http/BaseController'

export default class AuthController extends BaseController {
  protected async signup() {
    await AuthService.signup()
  }

  protected async login() {
    await AuthService.login()
  }

  protected async logout() {
    return await AuthService.logout()
  }

  // Auth status and information
  protected async status() {
    return await AuthService.status()
  }

  // Send password reset link
  protected async forgotPassword() {
    return await AuthService.forgotPassword()
  }

  protected async resetPassword() {
    return await AuthService.resetPassword()
  }
}
