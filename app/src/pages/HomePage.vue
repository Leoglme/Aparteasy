<template>
  <section id="home" class="pt-5">
    <h1 v-if="authStore.user">hello {{authStore.user.name}}</h1>
    <RouterLink to="/searches">Recherches</RouterLink>
  </section>
</template>

<script lang="ts" setup>
import { SITE_NAME } from "@/env";
import { useAuthStore } from '@/stores/auth.store'
/*REFS*/

/*STORE*/
const authStore = useAuthStore()

/*METHODS*/

/*API*/

/*METAS*/
document.title = `Accueil | ${SITE_NAME}`
</script>

<style lang="scss" scoped>
#home {
  flex-direction: column;
  gap: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
