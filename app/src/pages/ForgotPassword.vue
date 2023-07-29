<template>
  <section class="p-4 vh-100 flex items-start justify-center lg:min-h-items-center">
    <div :class="showSuccess ? 'container-sm' : 'container-xs'">
      <Logo class="flex justify-center mb-8" large />
      <div class="flex flex-col gap-4">
        <ForgotPasswordForm @success="showSuccess = true" v-if="!showSuccess" />
        <div class="grid gap-4" v-else>
          <div class="flex items-center justify-center gap-3">
            <h1 class="text-medium text-center text-3xl">Email envoyé</h1>
            <Icon name="square-check" stroke="var(--green)" />
          </div>

          <p class="text-contrast-70">
            Un email vous a été envoyé avec un lien pour réinitialiser votre mot de passe
            {{ SITE_NAME }}. Pour choisir un nouveau mot de passe et valider votre demande, cliquez
            sur le lien dans l'email.
          </p>
        </div>
      </div>
      <h6 class="text-medium text-sm mt-6 centered gap-2 flex-wrap">
        Vous n'avez pas perdus votre mot de passe ?
        <router-link class="link" :to="{ name: 'login', query: $route.query }"
          >Se connecter</router-link
        >
      </h6>
    </div>
  </section>
</template>
<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue'
import Icon from '@/components/ui/Icon.vue'
import { SITE_NAME } from '@/env'
import { ref } from 'vue'

/*METAS*/
document.title = 'Mot de passe oublié | ' + SITE_NAME

/*REFS*/
const showSuccess = ref(false)
</script>
