<template>
  <div class="w-full flex items-center justify-center vh-100">
    <Spinner/>
  </div>
</template>

<script lang="ts" setup>
import Spinner from '@/components/ui/Spinner.vue'
import { useRoute, useRouter } from 'vue-router';
import { SITE_NAME } from '@/env';
import { useAuthStore } from '@/stores/auth.store';
import { onMounted, ref } from 'vue';
import { useSearchStore } from '@/stores/search.store'
/*HOOKS*/
const route = useRoute()
const router = useRouter()
/*STORE*/
const authStore = useAuthStore();
const searchStore = useSearchStore();
/*REFS*/
const token = ref(route.query.token?.toString())

/*METHODS*/
const handleError = (routeName = 'login') => {
  router.push({ name: routeName, query: { redirect: route.fullPath } })
}

/*MIDDLEWARE ACCEPT INVITATION*/
const acceptInvitation = async () => {
  try {
    const decodedToken = await searchStore.decodeInvitationToken(token.value);
    const invitedUserEmail = decodedToken.email;

    console.log({
      decodedToken,
      invitedUserEmail,
      authStoreUserEmail: authStore.user.email
    })
    if (decodedToken.hasAccount) {
      if (authStore.user.email === invitedUserEmail) {
        await searchStore.acceptInvitation(token.value);
        await router.push({ name: 'properties', params: { searchId: decodedToken.searchId } });
      } else {
        handleError();
      }
    } else {
      handleError('signup');
    }
  } catch (e) {
    console.log(e);
    handleError();
  }
};

onMounted(() => {
  acceptInvitation();
});

/*METAS*/
document.title = `Acceptation invitation recherche.. | ${SITE_NAME}`
</script>
