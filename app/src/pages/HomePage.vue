<template>
  <section id="home" class="pt-5">
    <h1>hello {{authStore.user.name}}</h1>
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
document.title = `Create and manage awesome widgets | ${SITE_NAME}`
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
