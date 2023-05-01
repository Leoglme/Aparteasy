import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/search-invitations/:searchId/invite', 'SearchInvitationController.invite')
  Route.patch('/search-invitations/:token/accept', 'SearchInvitationController.accept')
})
  .prefix('/api')
  .middleware('auth')

Route.group(() => {
  Route.get('/search-invitations/decode-token', 'SearchInvitationController.decodeToken')
}).prefix('/api')
