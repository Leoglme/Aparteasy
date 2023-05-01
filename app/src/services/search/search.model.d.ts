import type { TimeStamps } from "@/services/model";
import type { Location } from '@/services/location/location.model'
import type { User } from '@/services/user/user.model'

export interface Search extends TimeStamps {
  id: number
  name: string
  location_id: number
  creator_id: number
  location: Location
  creator: User
  users: User[]
}

export type SearchCommand = {
  name: string
  location?: Location
}

export interface SearchInviteResponse extends TimeStamps {
  id: number,
  search_id: number,
  sender_id: number,
  receiver: string,
  accepted: boolean
}
