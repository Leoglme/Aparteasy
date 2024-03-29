import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import Oauth2Page from '@/pages/Oauth2Page.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPassword from '@/pages/ResetPassword.vue'
import SearchesPage from '@/pages/SearchesPage.vue'
import SearchInviteRedirectPage from '@/pages/SearchInviteRedirectPage.vue'
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
import { useSearchStore } from '@/stores/search.store'
import { usePropertyStore } from '@/stores/property.store'
import { useAppStore } from '@/stores/app.store'
import { deleteCookie, getCookie } from '@/utils/cookie.utils'
import { notify } from '@/plugins/notyf'
import TutorialPage from '@/pages/TutorialPage.vue'
import UserLocationPage from '@/pages/UserLocationPage.vue'
import { useRouterStore } from '@/stores/router.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // sitemap: { "priority": 0.9, "changefreq": "monthly" }
    {
      path: '/',
      name: 'home',
      components: {
        default: HomePage,
        Navbar: Navbar,
        Footer: Footer
      },
      beforeEnter: async (to, from, next) => {
        /*STORE*/
        const searchStore = useSearchStore()

        if (!searchStore.searches.length) {
          next({ name: 'createSearch' })
        } else {
          next({ name: 'searches' })
        }
      }
    },
    // sitemap: { "priority": 0.5, "changefreq": "monthly" }
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    // sitemap: { "priority": 1, "changefreq": "monthly" }
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: ResetPassword
    },
    {
      path: '/oauth2',
      name: 'oauth2',
      component: Oauth2Page
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: TutorialPage
    },
    {
      path: '/search-invite',
      name: 'searchInviteRedirect',
      component: SearchInviteRedirectPage,
      beforeEnter: async (to, from, next) => {
        const handleError = (routeName = 'login') => {
          if (token) {
            localStorage.setItem('inviteToken', token)
          }
          next({ name: routeName, query: { redirect: to.fullPath } })
        }

        const token = to.query.inviteToken?.toString()
        const searchStore = useSearchStore()
        const authStore = useAuthStore()

        try {
          const decodedToken = await searchStore.decodeInvitationToken(token)
          const invitedUserEmail = decodedToken.email
          if (decodedToken.hasAccount) {
            if (authStore.user.email === invitedUserEmail) {
              await searchStore.acceptInvitation(token)
              next({ name: 'properties', params: { searchId: decodedToken.searchId } })
              localStorage.removeItem('inviteToken')
            } else {
              handleError()
            }
          } else {
            handleError('signup')
          }
        } catch (e) {
          console.log(e)
          handleError()
        }
      }
    },
    {
      path: '/searches',
      name: 'searches',
      components: {
        default: SearchesPage,
        Navbar: Navbar,
        Footer: Footer
      }
    },
    {
      path: '/searches/create',
      name: 'createSearch',
      components: {
        default: SearchCreatePage,
        Navbar: Navbar,
        Footer: Footer
      }
    },
    {
      path: '/searches/:searchId/invite',
      name: 'inviteSearch',
      components: {
        default: SearchInvitePage,
        Navbar: Navbar,
        Footer: Footer
      }
    },
    {
      path: '/locations',
      name: 'createLocation',
      components: {
        default: UserLocationPage,
        Navbar: Navbar,
        Footer: Footer
      },
      beforeEnter: async (to, from, next) => {
        useRouterStore().setPreviousRoute(from.path)
        next()
      }
    },
    {
      path: '/searches/:searchId/property/create',
      name: 'createProperty',
      components: {
        default: PropertyCreatePage,
        Navbar: Navbar,
        Footer: Footer
      }
    },
    {
      path: '/searches/:searchId/property/:propertyId',
      name: 'property',
      components: {
        default: PropertyPage,
        Navbar: Navbar,
        Footer: Footer
      },
      beforeEnter: async (to, from, next) => {
        /*STORE*/
        const propertyStore = usePropertyStore()
        try {
          await propertyStore.fetchProperty(
            Number(to.params.searchId),
            Number(to.params.propertyId)
          )
          next()
        } catch (e) {
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
        Footer: Footer
      },
      beforeEnter: async (to, from, next) => {
        /*STORE*/
        const propertyStore = usePropertyStore()
        try {
          await propertyStore.fetchProperty(
            Number(to.params.searchId),
            Number(to.params.propertyId)
          )
          next()
        } catch (e) {
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
        Footer: Footer
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
    {
      path: '/:catchAll(.*)',
      redirect: '/tutorial'
    }
  ]
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  const appStore = useAppStore()
  /*MIDDLEWARE IS CONNECTED*/
  if (!publicRoutes.includes(to.path) && !auth.isConnected) {
    await router.push('/login')
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
  if (error?.message) {
    notify.error(error.message)
    deleteCookie('error_message')
  }
})

export default router
