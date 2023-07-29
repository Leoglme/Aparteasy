import { defineStore } from 'pinia'
import type { UserLocation, UserLocationCommand } from '@/services/userLocation/userLocation.model'
import { UserLocationService } from '@/services/userLocation/userLocation'

export const useUserLocationStore = defineStore('userLocationStore', {
  state: () => ({
    userLocations: [] as UserLocation[] | never[]
  }),
  actions: {
    setUserLocations(userLocations: UserLocation[]) {
      this.userLocations = userLocations
    },
    async getAllUserLocations() {
      const { data } = await UserLocationService.all()
      if (data) {
        this.setUserLocations(data)
      }
    },
    async updateUserLocations(userLocationData: UserLocationCommand[]) {
      const { data } = await UserLocationService.update(userLocationData)
      if (data) {
        this.setUserLocations(data)
      }
    }
  }
})
