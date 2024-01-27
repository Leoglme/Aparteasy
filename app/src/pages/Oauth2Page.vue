<template>
  <div class="w-full flex items-center justify-center min-h-screen">
    <Spinner />
  </div>
</template>

<script lang="ts" setup>
import Spinner from '@/components/ui/Spinner.vue'
import { useRoute, useRouter } from 'vue-router'
import { SITE_NAME } from '@/env'
import { notify } from '@/plugins/notyf'
import { useAuthStore } from '@/stores/auth.store'
import { AuthService } from '@/services/auth/auth'
import { ref } from 'vue'
/*HOOKS*/
const route = useRoute()
const router = useRouter()
/*STORE*/
const authStore = useAuthStore()
/*REFS*/
const token = ref(route.query.token || (undefined as String | undefined))
const inviteToken = ref(localStorage.getItem('inviteToken') || (undefined as String | undefined))
/*METHODS*/
const handleError = () => {
  if (inviteToken.value) {
    router.push({
      name: 'login',
      query: { redirect: `/search-invite?inviteToken=${inviteToken.value}` }
    })
  } else {
    router.push({ name: 'login' })
  }
  notify.error('An error occurred while logging in, please try again')
}
if (!token.value) {
  handleError()
} else {
  authStore.setToken(token.value ? token.value.toString() : undefined)
  AuthService.status()
    .then(({ data }) => {
      authStore.setUser(data.user)
      if (inviteToken.value) {
        router.push({
          name: 'searchInviteRedirect',
          query: { inviteToken: inviteToken.value.toString() }
        })
      } else {
        router.push('/')
      }
    })
    .catch(() => {
      handleError()
    })
}
/*METAS*/
document.title = `Authentification en cours... | ${SITE_NAME}`
</script>
