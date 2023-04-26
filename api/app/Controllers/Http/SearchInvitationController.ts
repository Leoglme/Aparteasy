import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SearchInvitationService } from 'App/Services/SearchInvitationService'
import SearchInvitationValidator from 'App/Validators/SearchInvitationValidator'
import BaseController from 'App/Controllers/Http/BaseController'

export default class SearchInvitationController extends BaseController {
  public async invite({ params, response, request, auth }: HttpContextContract) {
    const { searchId } = params
    const { receiverIds } = await request.validate(SearchInvitationValidator)
    const senderId = auth.user?.id

    const searchInvitations = await SearchInvitationService.createMany(
      searchId,
      senderId,
      receiverIds
    )

    return response.created({ searchInvitations })
  }

  public async accept({ params, response }: HttpContextContract) {
    const searchInvitation = await SearchInvitationService.updateAccepted(params.token, true)

    return response.ok({ searchInvitation })
  }
}
