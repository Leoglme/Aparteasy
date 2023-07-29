import type { TimeStamps } from '@/services/model'
export interface Location extends TimeStamps {
  id: number
  address: string
  city: string
  region: string
  country: string
  lat: number
  lng: number
}

export type LocationCommand = {
  address: string
  city: string
  region: string
  country: string
  lat: number
  lng: number
}
