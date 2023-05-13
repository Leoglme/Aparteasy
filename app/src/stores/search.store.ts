import { defineStore } from 'pinia';
import type { Search, SearchCommand } from '@/services/search/search.model'
import { SearchService } from '@/services/search/search'
import router from '@/router'
import { useAuthStore } from '@/stores/auth.store'

export const useSearchStore = defineStore('searchStore', {
    state: () => ({
        searches: [] as Search[],
    }),
    actions: {
        setSearches(searches: Search[]) {
            this.searches = searches;
        },
        findSearchById(id: number): Search | undefined {
            return this.searches.find(search => search.id === id);
        },
        async createSearch(search: SearchCommand) {
            const { data } = await SearchService.create(search);
            if (data) {
                this.searches.unshift(data);
                await router.push({ name: 'properties', params: { id: data.id.toString() } });
            }
        },
        async deleteSearch(id: number) {
            await SearchService.delete(id);
            this.searches = this.searches.filter(search => search.id !== id);
        },
        async inviteUsers(emails: string[]) {
            await SearchService.inviteUsers(this.currentSearchId, emails);
        },
        async acceptInvitation(token?: string) {
            await SearchService.acceptInvitation(token);
        },
        async decodeInvitationToken(token?: string) {
            const { data } = await SearchService.decodeInvitationToken(token);
            return data;
        },
        reset() {
            this.searches = [];
        }
    },
    getters: {
        currentSearchId: (): number => Number(router.currentRoute.value.params.id),
        currentSearch(): Search | undefined {
            return useSearchStore().findSearchById(this.currentSearchId);
        },
        isSearchCreator(): boolean {
            return this.currentSearch?.creator_id === useAuthStore().user?.id;
        }
    }
});
