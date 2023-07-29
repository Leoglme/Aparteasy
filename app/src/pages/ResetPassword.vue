<template>
  <section class="p-4 vh-100 flex items-start justify-center lg:min-h-items-center">
    <div class="container-xs">
      <Logo class="flex justify-center mb-8" large />
      <div class="flex flex-col gap-4">
        <ResetPasswordForm />
      </div>
      <h6 class="text-medium text-sm mt-6 centered gap-2 flex-wrap">
        Vous n'avez pas perdus votre mot de passe ?
        <router-link class="link" :to="{ name: 'login' }">Se connecter</router-link>
      </h6>
    </div>
  </section>
</template>
<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue'
import { SITE_NAME } from '@/env'

/*METAS*/
document.title = 'Modifier votre mot de passe | ' + SITE_NAME
</script>
