import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import Oauth2Page from "@/pages/Oauth2Page.vue";
import SearchesPage from "@/pages/SearchesPage.vue";
import { useAuthStore } from '@/stores/auth.store'
import Navbar from '@/components/navigations/Navbar.vue'
import { publicPages } from '@/utils/router'
import ReferentialService from '@/services/ReferentialService'
import SearchInvitePage from '@/pages/SearchInvitePage.vue'
import SearchCreatePage from '@/pages/SearchCreatePage.vue'
import PropertiesPage from '@/pages/PropertiesPage.vue'

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
      path: '/searches/:id/properties',
      name: 'properties',
      components: {
        default: PropertiesPage,
        Navbar: Navbar,
      },
    },
  ]
})
let referentialLoaded = false;
router.beforeEach(async (to) => {
  const auth = useAuthStore();
  /*MIDDLEWARE IS CONNECTED*/
  if (!publicPages.includes(to.path) && !auth.isConnected) {
    await router.push("/login");
  }
  /*MIDDLEWARE LOAD REFERENTIAL DATAS*/
  if (!publicPages.includes(to.path) && auth.isConnected && !referentialLoaded) {
    auth.setToken(auth.token)
    await ReferentialService.loadDatas()
    referentialLoaded = true
  }

  // /*MIDDLEWARE IS ADMIN*/
  // if ((!auth.token || !auth.user || !auth.is_admin()) && to.path.includes('administration')) {
  //   await router.push('/')
  // }
});

export default router
