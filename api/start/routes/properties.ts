import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:id', 'PropertyController.show')
  Route.post('/', 'PropertyController.create')
  Route.delete('/:id', 'PropertyController.delete')
})
  .prefix('/api/properties')
  .middleware('auth')

Route.group(() => {
  Route.get('/searches/:id/properties', 'PropertyController.index')
})
  .prefix('/api')
  .middleware('auth')
