import SearchInvitation from 'App/Models/SearchInvitation'
import { UserService } from 'App/Services/UserService'
import Search from 'App/Models/Search'
import SearchUser from 'App/Models/SearchUser'
import Encryption from '@ioc:Adonis/Core/Encryption'
import MailService from 'App/Services/MailService'
import appInfos from 'Config/app-infos'
import AuthService from 'App/Services/AuthService'
import BaseService from 'App/Services/BaseService'
import SearchService from 'App/Services/SearchService'

type SearchInvitationCommand = {
  search_id: number
  sender_id: number
  receiver: string
  accepted: boolean
}

type TokenInvite = {
  email: string
  searchId: string
}

export class SearchInvitationService extends BaseService {
  public static async createMany(
    searchId: number,
    senderId: number,
    receivers: string[]
  ): Promise<SearchInvitation[]> {
    const isSenderCreator = await this.isCreator(searchId, senderId)

    if (!isSenderCreator) {
      throw new Error('Only the creator can send invitations.')
    }

    const searchInvitations: SearchInvitationCommand[] = []

    for (const receiver of receivers) {
      const isReceiverMember = await this.userAlreadyMember(receiver, searchId)
      const receiverUser = await UserService.findByEmail(receiver)
      const isReceiverCreator = receiverUser ? receiverUser.id === senderId : false

      if (!isReceiverMember && !isReceiverCreator) {
        searchInvitations.push({
          search_id: searchId,
          sender_id: senderId,
          receiver: receiver,
          accepted: false,
        })
      }
    }
    const invitations = await SearchInvitation.createMany(searchInvitations)
    const emails = searchInvitations.map((invitation) => invitation.receiver)
    await this.sendInvitationsEmail(emails, searchId)
    return invitations
  }

  public static generateInviteToken = (email: string, searchId: number) => {
    return Encryption.encrypt({ email, searchId })
  }

  public static sendInvitationsEmail = async (emails: string[], searchId: number) => {
    const search = await Search.query().preload('creator').where('id', searchId).firstOrFail()
    const sender = search.creator.name

    for (const email of emails) {
      const inviteToken = this.generateInviteToken(email, searchId)
      await MailService.sendMany({
        emails,
        subject: `Invitation ${appInfos.name} | ${sender} invites you to join ${search.name}`,
        viewPath: 'emails/search-invite',
        payload: {
          url: `${appInfos.url}/search-invite?token=${inviteToken}`,
          sender,
          searchName: search.name,
          inviteToken,
        },
      })
    }
  }

  public static async updateAccepted(
    token: string,
    accepted: boolean
  ): Promise<SearchInvitation | undefined> {
    const inviteToken: TokenInvite | null = Encryption.decrypt(token.trim())
    const user = inviteToken ? await UserService.findByEmail(inviteToken.email) : null
    const connectedUser = super.auth.user

    if (!inviteToken || !user || user.id !== connectedUser?.id) {
      AuthService.unauthorized()
      return
    }

    const searchId = Number(inviteToken.searchId)

    const searchInvitation = await SearchInvitation.query()
      .where('receiver', inviteToken.email)
      .andWhere('search_id', searchId)
      .orderBy('id', 'desc')
      .firstOrFail()

    await SearchService.addUserToSearch(searchId, user.id)

    searchInvitation.accepted = accepted
    await searchInvitation.save()

    return searchInvitation
  }

  public static async userAlreadyMember(email: string, searchId: number) {
    const user = await UserService.findByEmail(email)
    if (!user) return false
    const searchUser = await SearchUser.query()
      .where('user_id', user.id)
      .andWhere('search_id', searchId)
      .first()
    return !!searchUser
  }

  public static async isCreator(searchId: number, userId: number) {
    const search = await Search.findOrFail(searchId)
    return search.creator_id === userId
  }
}
