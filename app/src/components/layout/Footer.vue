<template>
  <footer
    class="flex-col justify-center gap-4 absolute w-full bg-grey-500 bt-1 border-grey-300 py-3 px-4 footer"
  >
    <div class="flex items-center gap-2" v-if="user">
      <Avatar v-if="user.avatar_url" size="32px" :src="user.avatar_url" :alt="user.name" />
      <Avatar v-else iconMode="fill" icon="account" />
      <span>{{ user.name }}</span>
    </div>

    <Button @click="() => logout()" startIcon="logout" variant="red"> Déconnexion </Button>
  </footer>
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/Button.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth.store'

const { logout } = useAuthStore()
const user = useAuthStore().user
</script>

<style lang="scss" scoped>
@import '@/assets/style/core/mixins';

.footer {
  display: none;
  bottom: -120px;
  @include down(650) {
    display: flex;
  }
}
</style>
