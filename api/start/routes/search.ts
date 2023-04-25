import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'SearchController.create').as('create')
  Route.get('/', 'SearchController.index').as('index')
  Route.get('/{id}', 'SearchController.show').as('show')
  Route.delete('/{id}', 'SearchController.delete').as('delete')
})
  .prefix('/api/search')
  .middleware('auth')
