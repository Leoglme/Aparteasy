import type { TimeStamps } from '@/services/model'

export interface User extends TimeStamps {
  id: number
  email: string
  password: string
  name: string
  avatar_url: string
}
