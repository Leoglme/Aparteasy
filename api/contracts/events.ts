import User from 'App/Models/User'

declare module '@ioc:Adonis/Core/Event' {
  interface EventsAuth {
    'new:user': User
    'login': User
  }
}
