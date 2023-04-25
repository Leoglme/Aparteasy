import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/searches/:searchId/invite', 'SearchInvitationController.invite')
  Route.patch('/search-invitations/:invitationId/accept', 'SearchInvitationController.accept')
}).middleware('auth')
