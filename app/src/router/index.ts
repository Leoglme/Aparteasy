import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import Oauth2Page from "@/pages/Oauth2Page.vue";
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    },
    {
      path: '/oauth2',
      name: 'oauth2',
      component: Oauth2Page
    },
  ]
})


router.beforeEach(async (to) => {

  const auth = useAuthStore();
  const publicPages = ["/login", "/signup", "/oauth2"];
  /*MIDDLEWARE IS CONNECTED*/
  if (!publicPages.includes(to.path) && (!auth.token || !auth.user)) {
    await router.push("/login");
  }

  // /*MIDDLEWARE IS ADMIN*/
  // if ((!auth.token || !auth.user || !auth.is_admin()) && to.path.includes('administration')) {
  //   await router.push('/')
  // }
});

export default router
