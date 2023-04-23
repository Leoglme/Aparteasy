import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /* Google Auth */
  Route.get('/google', async ({ response }) => {
    return response.send('<a href="/api/oauth2/google/redirect"> Login with Google </a>')
  })
  Route.get('/:provider/redirect', 'SocialAuthController.redirect').where('provider', /google/)
  Route.get('/:provider/callback', 'SocialAuthController.callback').where('provider', /google/)
}).prefix('/api/oauth2')
