<template>
  <nav class="flex justify-between items-center bg-grey-500 bb-1 border-grey-300 py-3 px-8">
    <div class="flex flex-1 justify-center">
      <RouterLink to="/">
        <Logo class="relative" style="left: 140px;" :size="30" large/>
      </RouterLink>
    </div>



    <div class="flex items-center justify-center gap-8">
      <div class="flex items-center gap-2" v-if="user">
        <Avatar v-if="user.avatar_url" size="32px" :src="user.avatar_url" :alt="user.name"/>
        <Avatar v-else iconMode="fill" icon="account"/>
        <span>{{ user.name }}</span>
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
