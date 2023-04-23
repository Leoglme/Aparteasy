import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    pending: false
  }),
  actions: {
    setPending(pending: boolean) {
      this.pending = pending;
    }
  }
});
