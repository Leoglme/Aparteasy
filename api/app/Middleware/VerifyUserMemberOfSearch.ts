import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SearchUser from 'App/Models/SearchUser'
import Search from 'App/Models/Search'

export default class VerifyUserMemberOfSearch {
  private async isCreator(searchId: number, userId: number | undefined): Promise<boolean> {
    if (!userId) return false
    const search = await Search.find(searchId)
    return search?.creator_id === userId
  }

  private async isMember(searchId: number, userId: number | undefined): Promise<boolean> {
    if (!userId) return false
    const searchUser = await SearchUser.query()
      .where('user_id', userId)
      .andWhere('search_id', searchId)
      .first()
    return !!searchUser
  }

  public async handle({ auth, params, response }: HttpContextContract, next: () => Promise<void>) {
    const userId = auth.user?.id
    const searchId = params.search_id

    const isCreator = await this.isCreator(searchId, userId)
    const isMember = await this.isMember(searchId, userId)

    if (!isMember && !isCreator) {
      return response.status(403).json({
        message: "Vous n'êtes pas membre de cette recherche.",
      })
    }

    await next()
  }
}
