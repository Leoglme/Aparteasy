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
    setPending(pending: boolean): void {
      this.pending = pending
    },
    async execWithPending<T>(func: () => Promise<T>): Promise<T> {
      try {
        this.setPending(true)
        return await func()
      } catch (error) {
        console.error(error)
        this.setPending(false)
        return Promise.reject(error)
      } finally {
        this.setPending(false)
      }
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
