import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.put('/searches/:search_id/properties/:id/ratings', 'PropertyRatingsController.update')
})
  .prefix('/api')
  .middleware(['auth', 'verifyUserMemberOfSearch'])
