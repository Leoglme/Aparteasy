import Event from '@ioc:Adonis/Core/Event'
import type { EventsAuth } from '@ioc:Adonis/Core/Event'
export default class AuthListener {
  public async onNewUser({ user, socketId }: EventsAuth['new:user']) {
    await Event.emit('notify:success', { message: `Bienvenue ${user.name} !`, socketId })
  }

  public async onLogin({ user, socketId }: EventsAuth['login']) {
    await Event.emit('notify:success', { message: `Bienvenue ${user.name} !`, socketId })
  }
}
