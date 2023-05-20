import Event from '@ioc:Adonis/Core/Event'
import type { EventsAuth } from '@ioc:Adonis/Core/Event'
import User from 'App/Models/User'
import MailService from 'App/Services/MailService'
import appInfos from 'Config/app-infos'
export default class AuthListener {
  public async onNewUser({ user, socketId }: EventsAuth['new:user']) {
    await Event.emit('notify:success', { message: `Bienvenue ${user.name} !`, socketId })
    await this.sendWelcomeEmail(user)
  }

  public async onLogin({ user, socketId }: EventsAuth['login']) {
    await Event.emit('notify:success', { message: `Bienvenue ${user.name} !`, socketId })
  }

  protected async sendWelcomeEmail(user: User) {
    await MailService.send({
      email: user.email,
      subject: `Bienvenue sur ${appInfos.name} - Votre guide pour une recherche d'appartement facile.`,
      viewPath: 'emails/welcome',
      payload: {
        username: user.name,
      },
    })
  }
}
