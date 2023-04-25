import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SearchInvitationService } from 'App/Services/SearchInvitationService'

export default class SearchInvitationController {
  public async invite({ params, response, request, auth }: HttpContextContract) {
    const { searchId } = params
    const { receiverIds } = request.all()
    const senderId = auth.user?.id

    const searchInvitations = await SearchInvitationService.createMany(
      searchId,
      senderId,
      receiverIds
    )

    return response.created({ searchInvitations })
  }

  public async accept({ params, response }: HttpContextContract) {
    const searchInvitation = await SearchInvitationService.updateAccepted(params.invitationId, true)

    return response.ok({ searchInvitation })
  }
}
