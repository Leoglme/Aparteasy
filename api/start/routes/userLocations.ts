import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UserLocationsController.getAllByUserId').as('indexUserLocations')
  Route.put('/', 'UserLocationsController.update').as('updateUserLocations')
})
  .prefix('/api/user_locations')
  .middleware('auth')
