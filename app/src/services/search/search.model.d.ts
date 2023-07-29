import type { TimeStamps } from '@/services/model'
import type { User } from '@/services/user/user.model'

export interface Search extends TimeStamps {
  id: number
  name: string
  creator_id: number
  creator: User
  users: User[]
}

export type SearchCommand = {
  name: string
}

export interface SearchInviteResponse extends TimeStamps {
  id: number
  search_id: number
  sender_id: number
  receiver: string
  accepted: boolean
}
