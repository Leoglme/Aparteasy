import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/searches/:search_id/properties', 'PropertyController.allBySearchId')
  Route.post('/searches/:search_id/properties', 'PropertyController.create')
  Route.put('/searches/:search_id/properties/:id', 'PropertyController.update')
  Route.delete('/searches/:search_id/properties/:id', 'PropertyController.delete')
  Route.get('/searches/:search_id/properties/:id', 'PropertyController.show')
})
  .prefix('/api')
  .middleware(['auth', 'verifyUserMemberOfSearch'])

Route.group(() => {
  Route.get('/properties', 'PropertyController.index')
}).prefix('/api')
