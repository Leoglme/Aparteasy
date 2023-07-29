import { defineStore } from 'pinia'
import { useSearchStore } from '@/stores/search.store'
import { usePropertyStore } from '@/stores/property.store'
import { useAuthStore } from '@/stores/auth.store'
import { useRouterStore } from '@/stores/router.store'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    pending: false,
    referentialLoaded: false
  }),
  actions: {
    setPending(pending: boolean) {
      this.pending = pending
    },
    setReferentialLoaded(referentialLoaded: boolean) {
      this.referentialLoaded = referentialLoaded
    },
    async resetStores() {
      useAuthStore().reset()
      useSearchStore().reset()
      usePropertyStore().reset()
      await useRouterStore().reset()
      this.setReferentialLoaded(false)
    }
  }
})
