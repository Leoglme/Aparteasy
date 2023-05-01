import { defineStore } from "pinia";
import type { Search, SearchCommand } from '@/services/search/search.model'
import { SearchService } from '@/services/search/search'
import router from '@/router'

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
    },
    async createSearch(search: SearchCommand) {
      const { data } = await SearchService.create(search);
      if (data) {
        this.searches.push(data);
        await router.push({ name: 'properties', params: { id: data.id.toString() } });
      }
    },
    async deleteSearch(id: number) {
      await SearchService.delete(id);
      this.searches = this.searches.filter(search => search.id !== id);
    }
  },
});
