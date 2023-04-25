import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'LocationController.create').as('createLocation')
}).prefix('/api/location')
