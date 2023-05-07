import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SearchUser from 'App/Models/SearchUser'

export default class VerifyUserMemberOfSearch {
  public async handle({ auth, params, response }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.user
    const searchId = params.search_id

    const searchUser = await SearchUser.query()
      .where('user_id', user?.id)
      .andWhere('search_id', searchId)
      .first()

    if (!searchUser) {
      return response.status(403).json({
        message: "Vous n'êtes pas membre de cette recherche.",
      })
    }

    await next()
  }
}
