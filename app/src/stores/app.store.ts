import { defineStore } from 'pinia';
import { useSearchStore } from '@/stores/search.store'
import { usePropertyStore } from '@/stores/property.store'
import { useAuthStore } from '@/stores/auth.store'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    pending: false,
    referentialLoaded: false
  }),
  actions: {
    setPending(pending: boolean) {
      this.pending = pending;
    },
    setReferentialLoaded(referentialLoaded: boolean) {
        this.referentialLoaded = referentialLoaded;
    },
    resetStores() {
      useAuthStore().reset()
      useSearchStore().reset()
      usePropertyStore().reset()
      this.setReferentialLoaded(false)
    }
  }
});
