import { AuthService } from '@/services/auth/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { SearchService } from '@/services/search/search'
import { useSearchStore } from '@/stores/search.store'
import { useAppStore } from '@/stores/app.store'

export default class ReferentialService {
    public static async loadDatas() {
        useAppStore().setPending(true)
        await this.loadAuthStatus()
        await this.loadSearches()
        useAppStore().setPending(false)
    }

    private static async loadSearches() {
        const { data } = await SearchService.all()
        useSearchStore().setSearches(data)
    }
    private static async loadAuthStatus() {
        await AuthService.status().then(response => {
            const user = response.data.user
            if (!user) {
                return useRouter().push({ name: 'login' })
            }
            useAuthStore().setUser(user)
        })
    }
}
