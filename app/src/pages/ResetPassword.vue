<template>
  <section class="p-4 min-h-screen flex items-start justify-center lg-height:items-center">
    <div class="max-w-xs">
      <Logo class="flex justify-center mb-8" large />
      <div class="flex flex-col gap-4">
        <ResetPasswordForm />
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
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue'
import { SITE_NAME } from '@/env'
import EasyLink from "@/components/buttons/EasyLink.vue";

/*METAS*/
document.title = 'Modifier votre mot de passe | ' + SITE_NAME
</script>
