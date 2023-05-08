import User from 'App/Models/User'

declare module '@ioc:Adonis/Core/Event' {
  interface EventsAuth {
    'new:user': { user: User; socketId: string }
    'login': { user: User; socketId: string }
  }
  interface EventsNotify {
    'notify:success': { message: string; socketId: string }
    'notify:error': { message: string; socketId: string }
  }
}
