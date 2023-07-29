import { AuthService } from '@/services/auth/auth'
import { useAuthStore } from '@/stores/auth.store'
import { SearchService } from '@/services/search/search'
import { useSearchStore } from '@/stores/search.store'
import { useAppStore } from '@/stores/app.store'
import router from '@/router'

export default class ReferentialService {
  public static async loadDatas() {
    useAppStore().setPending(true)
    try {
      await this.loadAuthStatus()
      await this.loadSearches()
    } catch (e) {
      await router.push('/login')
    }
    useAppStore().setPending(false)
  }

  private static async loadSearches() {
    const { data } = await SearchService.all()
    useSearchStore().setSearches(data)
  }
  private static async loadAuthStatus() {
    await AuthService.status().then((response) => {
      const user = response.data.user
      useAuthStore().setUser(user)
    })
  }
}
