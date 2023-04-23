import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // registration logic
  Route.post('signup', 'AuthController.signup').as('signup')
  Route.get('status', 'AuthController.status').as('status')
  Route.post('login', 'AuthController.login').as('login')
  Route.get('logout', 'AuthController.logout').as('logout')
}).prefix('/api/auth/')
