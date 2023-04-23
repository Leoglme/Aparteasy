import './routes/auth'
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.group(() => {
  // check db connection
  Route.get('health', async ({ response }) => {
    const report = await HealthCheck.getReport()
    return report.healthy ? response.ok(report) : response.badRequest(report)
  }).as('health')
}).prefix('/api/')

Route.get('/', async () => {
  return { hello: 'world' }
})
