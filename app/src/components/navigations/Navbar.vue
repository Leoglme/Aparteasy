<template>
  <nav class="flex justify-center items-center relative bg-grey-500 bb-1 border-grey-300 py-3 px-8">
    <RouterLink to="/" class="navbar__logo">
      <Logo :size="30" large/>
    </RouterLink>



    <div class="flex items-center justify-center gap-8 navbar__actions">
      <div class="flex items-center gap-2" v-if="user">
        <Avatar v-if="user.avatar_url" size="32px" :src="user.avatar_url" :alt="user.name"/>
        <Avatar v-else iconMode="fill" icon="account"/>
        <span class="navbar__username">{{ user.name }}</span>
      </div>

      <Button @click="logout" small startIcon="logout" variant="red">
        Déconnexion
      </Button>
    </div>

  </nav>
</template>

<script lang="ts" setup>
import Logo from "@/components/common/Logo.vue"
import Button from '@/components/buttons/Button.vue'
import Avatar from '@/components/common/Avatar.vue'
import { useAuthStore } from '@/stores/auth.store'

const { logout } = useAuthStore()
const user = useAuthStore().user
</script>

<style lang="scss" scoped>
@import "@/assets/style/core/_mixins.scss";
.navbar__actions {
  position: absolute;
  right: 32px;

  @include down(650){
    display: none;
  }
}

.navbar__username {
  @include down(800){
    display: none;
  }
}
</style>
