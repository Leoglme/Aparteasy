<template>
  <section class="p-4 min-h-screen flex items-start justify-center lg-height:items-center">
    <div
        :class="showSuccess ? 'max-w-sm' : 'max-w-xs'">
      <Logo class="flex justify-center mb-8" large />
      <div class="flex flex-col gap-4">
        <ForgotPasswordForm @success="showSuccess = true" v-if="!showSuccess" />
        <div class="grid gap-4" v-else>
          <div class="flex items-center justify-center gap-3">
            <h1 class="font-medium text-center text-2xl sm:text-3xl">Email envoyé</h1>
            <Icon name="square-check" stroke="#00f593" />
          </div>

          <p class="text-contrast-700">
            Un email vous a été envoyé avec un lien pour réinitialiser votre mot de passe
            {{ SITE_NAME }}. Pour choisir un nouveau mot de passe et valider votre demande, cliquez
            sur le lien dans l'email.
          </p>
        </div>
      </div>

      <h6 class="font-medium text-sm mt-6 flex justify-center items-center gap-2 flex-wrap">
        Vous n'avez pas perdus votre mot de passe ?
        <EasyLink
            :to="{ name: 'login', query: $route.query }"
        >
          Se connecter
        </EasyLink>
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
import EasyLink from "@/components/buttons/EasyLink.vue";

/*METAS*/
document.title = 'Mot de passe oublié | ' + SITE_NAME

/*REFS*/
const showSuccess = ref(false)
</script>
