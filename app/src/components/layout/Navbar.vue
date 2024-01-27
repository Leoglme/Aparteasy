<template>
  <nav class="flex justify-center items-center relative bg-slate-800
  border-b border-gray-600 py-3 px-8">
    <RouterLink to="/">
      <Logo :size="30" large />
    </RouterLink>

    <div class="sm:flex items-center justify-center gap-8 absolute right-8 hidden">
      <div class="flex items-center gap-2" v-if="user">
        <Avatar v-if="user.avatar_url" size="32px" :src="user.avatar_url" :alt="user.name" />
        <Avatar v-else iconMode="fill" icon="account" />
        <span class="hidden md:block">{{ user.name }}</span>
      </div>

      <Button @click="() => logout()" small startIcon="logout" variant="red">
        Déconnexion
      </Button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import Logo from '@/components/ui/Logo.vue'
import Button from '@/components/buttons/EasyButton.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth.store'

const { logout } = useAuthStore()
const user = useAuthStore().user
</script>
