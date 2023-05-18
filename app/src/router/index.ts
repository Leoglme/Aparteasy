import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import Oauth2Page from "@/pages/Oauth2Page.vue";
import ForgotPassword from "@/pages/ForgotPassword.vue";
import ResetPassword from "@/pages/ResetPassword.vue";
import SearchesPage from "@/pages/SearchesPage.vue";
import SearchInviteRedirectPage from "@/pages/SearchInviteRedirectPage.vue";
import { useAuthStore } from '@/stores/auth.store'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { publicRoutes } from '@/utils/router.utils'
import ReferentialService from '@/services/ReferentialService'
import SearchInvitePage from '@/pages/SearchInvitePage.vue'
import SearchCreatePage from '@/pages/SearchCreatePage.vue'
import PropertiesPage from '@/pages/PropertiesPage.vue'
import PropertyCreatePage from '@/pages/PropertyCreatePage.vue'
import PropertyEditPage from '@/pages/PropertyEditPage.vue'
import PropertyPage from '@/pages/PropertyPage.vue'
import { useSearchStore } from "@/stores/search.store";
import { usePropertyStore } from "@/stores/property.store";
import { useAppStore } from '@/stores/app.store'
import { deleteCookie, getCookie } from '@/utils/cookie.utils'
import { notify } from '@/plugins/notyf'
import TutorialPage from '@/pages/TutorialPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomePage,
        Navbar: Navbar,
        Footer: Footer,
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
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPassword,
    },
    {
      path: '/oauth2',
      name: 'oauth2',
      component: Oauth2Page,
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: TutorialPage,
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
        Footer: Footer,
      },
    },
    {
      path: '/searches/create',
      name: 'createSearch',
      components: {
        default: SearchCreatePage,
        Navbar: Navbar,
        Footer: Footer,
      },
    },
    {
      path: '/searches/:searchId/invite',
      name: 'inviteSearch',
      components: {
        default: SearchInvitePage,
        Navbar: Navbar,
        Footer: Footer,
      },
    },
    {
      path: '/searches/:searchId/property/create',
      name: 'createProperty',
      components: {
        default: PropertyCreatePage,
        Navbar: Navbar,
        Footer: Footer,
      },
    },
    {
      path: '/searches/:searchId/property/:propertyId',
      name: 'property',
      components: {
        default: PropertyPage,
        Navbar: Navbar,
        Footer: Footer,
      },
      beforeEnter: async (to, from, next) => {
        /*STORE*/
        const propertyStore = usePropertyStore()
        try {
          await propertyStore.fetchProperty(Number(to.params.searchId), Number(to.params.propertyId))
          next()
        }catch (e) {
            next({ name: 'properties', params: { searchId: to.params.searchId } })
        }
      }
    },
    {
      path: '/searches/:searchId/property/:propertyId/edit',
      name: 'editProperty',
      components: {
        default: PropertyEditPage,
        Navbar: Navbar,
        Footer: Footer,
      },
      beforeEnter: async (to, from, next) => {
        /*STORE*/
        const propertyStore = usePropertyStore()
        try {
          await propertyStore.fetchProperty(Number(to.params.searchId), Number(to.params.propertyId))
          next()
        }catch (e) {
          next({ name: 'properties', params: { searchId: to.params.searchId } })
        }
      }
    },
    {
      path: '/searches/:searchId/properties',
      name: 'properties',
      components: {
        default: PropertiesPage,
        Navbar: Navbar,
        Footer: Footer,
      },
      beforeEnter: async (to, from, next) => {
        /*STORE*/
        const searchStore = useSearchStore()
        const propertyStore = usePropertyStore()

        /*MIDDLEWARES*/
        const search = searchStore.findSearchById(Number(to.params.searchId))
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

  /*COOKIES*/
  const error = getCookie('error_message')
  if(error?.message){
    notify.error(error.message)
    deleteCookie('error_message')
  }
});

export default router
