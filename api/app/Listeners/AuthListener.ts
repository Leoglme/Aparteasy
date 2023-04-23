import Event from '@ioc:Adonis/Core/Event'
import type { EventsAuth } from '@ioc:Adonis/Core/Event'
export default class AuthListener {
  public async onNewUser(user: EventsAuth['new:user']) {
    await Event.emit('notify:success', `Welcome ${user.name} !`)
  }

  public async onLogin(user: EventsAuth['login']) {
    await Event.emit('notify:success', `Welcome ${user.name} !`)
  }
}
