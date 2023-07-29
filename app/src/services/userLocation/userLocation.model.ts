import type { TimeStamps } from '@/services/model'
import type { User } from '@/services/user/user.model'
import type { Location, LocationCommand } from '@/services/location/location.model'

export interface UserLocation extends TimeStamps {
  id: number
  name: string
  user_id: number
  location_id: number
  user: User
  location: Location
}

export type UserLocationCommand = {
  name: string
  location: LocationCommand
}
