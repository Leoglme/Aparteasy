import { defineStore } from "pinia";
import type { Search } from '@/services/search/search.model'

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    searches: [] as Search[],
  }),
  actions: {
    setSearches(searches: Search[]) {
        this.searches = searches;
    },
    findSearchById(id: number) {
        return this.searches.find(search => search.id === id);
    }
  },
});
