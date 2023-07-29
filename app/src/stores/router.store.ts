import { defineStore } from 'pinia'
import router from '@/router'
import { filterBySearchText } from '@/utils/search.utils'

export const useRouterStore = defineStore('routerStore', {
  state: () => ({
    _previousRoute: null as string | null
  }),
  actions: {
    applySearch<T>(items: Array<T>, fields: Array<string>): Array<T> {
      return this.search ? filterBySearchText<T>(items, this.search, fields) : items
    },
    async setRouteSearch(search?: string) {
      await router.push({ query: { ...router.currentRoute.value.query, search } })
    },
    async reset() {
      await this.setRouteSearch(undefined)
    },
    setPreviousRoute(route: string) {
      this._previousRoute = route
    }
  },
  getters: {
    search: (): string => (router.currentRoute.value.query.search as string) || '',
    previousRoute: (state): string => {
      return state._previousRoute || '/'
    }
  }
})
