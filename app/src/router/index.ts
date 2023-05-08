import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import Oauth2Page from "@/pages/Oauth2Page.vue";
import SearchesPage from "@/pages/SearchesPage.vue";
import SearchInviteRedirectPage from "@/pages/SearchInviteRedirectPage.vue";
import { useAuthStore } from '@/stores/auth.store'
import Navbar from '@/components/navigations/Navbar.vue'
import { publicRoutes } from '@/utils/router'
import ReferentialService from '@/services/ReferentialService'
import SearchInvitePage from '@/pages/SearchInvitePage.vue'
import SearchCreatePage from '@/pages/SearchCreatePage.vue'
import PropertiesPage from '@/pages/PropertiesPage.vue'
import PropertyCreatePage from '@/pages/PropertyCreatePage.vue'
import { useSearchStore } from "@/stores/search.store";
import { usePropertyStore } from "@/stores/property.store";
import { useAppStore } from '@/stores/app.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomePage,
        Navbar: Navbar,
      },
      beforeEnter: async (to, from, next) => {
        /*STORE*/
        const searchStore = useSearchStore()

        if(!searchStore.searches.length){
          next({ name: 'createSearch' })
        }else {
          next({ name: 'searches' })
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
    {
      path: '/oauth2',
      name: 'oauth2',
      component: Oauth2Page,
    },
    {
      path: '/search-invite',
      name: 'searchInviteRedirect',
      component: SearchInviteRedirectPage,
    },
    {
      path: '/searches',
      name: 'searches',
      components: {
        default: SearchesPage,
        Navbar: Navbar,
      },
    },
    {
      path: '/searches/create',
      name: 'createSearch',
      components: {
        default: SearchCreatePage,
        Navbar: Navbar,
      },
    },
    {
      path: '/searches/:id/invite',
      name: 'inviteSearch',
      components: {
        default: SearchInvitePage,
        Navbar: Navbar,
      },
    },
    {
      path: '/searches/:id/property/create',
      name: 'createProperty',
      components: {
        default: PropertyCreatePage,
        Navbar: Navbar,
      },
    },
    {
      path: '/searches/:id/properties',
      name: 'properties',
      components: {
        default: PropertiesPage,
        Navbar: Navbar,
      },
      beforeEnter: async (to, from, next) => {
        /*STORE*/
        const searchStore = useSearchStore()
        const propertyStore = usePropertyStore()

        /*MIDDLEWARES*/
        const search = searchStore.findSearchById(Number(to.params.id))
        if (!search) {
          next({ name: 'searches' })
        } else {
          await propertyStore.fetchProperties(search.id)
          next()
        }
      }
    },
  ]
})

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  const appStore = useAppStore();
  /*MIDDLEWARE IS CONNECTED*/
  if (!publicRoutes.includes(to.path) && !auth.isConnected) {
    await router.push("/login");
  }
  /*MIDDLEWARE LOAD REFERENTIAL DATAS*/
  if (!publicRoutes.includes(to.path) && auth.isConnected && !appStore.referentialLoaded) {
    auth.setToken(auth.token)
    await ReferentialService.loadDatas()
    appStore.setReferentialLoaded(true)
  }

  // /*MIDDLEWARE IS ADMIN*/
  // if ((!auth.token || !auth.user || !auth.is_admin()) && to.path.includes('administration')) {
  //   await router.push('/')
  // }
});

export default router
