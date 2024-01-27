<template>
  <footer
    class="flex-col justify-center gap-4 absolute w-full bg-slate-800 border-t
    border-gray-600 py-3 px-4 flex sm:hidden bottom-[-120px]"
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
import Button from '@/components/buttons/EasyButton.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth.store'

const { logout } = useAuthStore()
const user = useAuthStore().user
</script>