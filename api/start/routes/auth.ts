import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // registration logic
  Route.post('signup', 'AuthController.signup').as('signup')
  Route.get('status', 'AuthController.status').as('status')
  Route.post('login', 'AuthController.login').as('login')
  Route.get('logout', 'AuthController.logout').as('logout')
  Route.post('forgot-password', 'AuthController.forgotPassword').as('forgotPassword')
  Route.post('reset-password', 'AuthController.resetPassword').as('resetPassword')
}).prefix('/api/auth/')
