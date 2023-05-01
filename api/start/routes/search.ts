import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'SearchController.create').as('createSearch')
  Route.get('/', 'SearchController.index').as('indexSearch')
  Route.get('/:id', 'SearchController.show').as('showSearch')
  Route.delete('/:id', 'SearchController.delete').as('deleteSearch')
})
  .prefix('/api/searches')
  .middleware('auth')
