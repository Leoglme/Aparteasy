import { defineStore } from 'pinia';
import router from '@/router'
import { filterBySearchText } from '@/utils/search.utils'

export const useRouterStore = defineStore('routerStore', {
    state: () => ({
    }),
    actions: {
        applySearch<T>(items: Array<T>, fields: Array<string>): Array<T> {
          return filterBySearchText<T>(items, this.search, fields)
        },
        async setRouteSearch(search?: string) {
            await router.push({ query: { ...router.currentRoute.value.query, search } });
        },
        async reset() {
            await this.setRouteSearch(undefined)
        }
    },
    getters: {
        search:(): string => router.currentRoute.value.query.search as string || '',
    }
});
