import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SearchInvitationService } from 'App/Services/SearchInvitationService'
import SearchInvitationValidator from 'App/Validators/SearchInvitationValidator'
import BaseController from 'App/Controllers/Http/BaseController'

export default class SearchInvitationController extends BaseController {
  public async invite({ params, response, request, auth }: HttpContextContract) {
    const { searchId } = params
    const { emails } = await request.validate(SearchInvitationValidator)
    const senderId = auth.user?.id

    const searchInvitations = await SearchInvitationService.createMany(searchId, senderId, emails)

    return response.created(searchInvitations)
  }

  public async accept({ params, response }: HttpContextContract) {
    const searchInvitation = await SearchInvitationService.updateAccepted(params.token, true)

    return response.ok(searchInvitation)
  }

  public async decodeToken({ request, response }: HttpContextContract) {
    const errorMessage = "Jeton d'invitation invalide"
    try {
      const token = request.input('token')
      const decodedToken = await SearchInvitationService.decodeInviteToken(token)
      if (!decodedToken) return await super.sendError(errorMessage, 400)
      response.status(200).send(decodedToken)
    } catch (error) {
      await super.sendError(errorMessage, 400)
      response.status(500).send("Jeton d'invitation invalide")
    }
  }
}
