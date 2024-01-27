<template>
  <section class="p-4 min-h-screen flex items-start justify-center lg-height:items-center">
    <div class="w-full m-inline-auto max-w-xs">
      <Logo class="justify-center mb-8" large />
      <div class="flex flex-col gap-4">
        <GoogleButton />
        <Divider text="ou" />
        <LoginForm />
      </div>
      <h6 class="font-medium text-sm mt-6 flex justify-center items-center gap-2 flex-wrap">
        Vous n'avez pas de compte ?
        <EasyLink
            :to="{ name: 'signup', query: $route.query }"
        >
          S’inscrire
        </EasyLink>
      </h6>
    </div>
  </section>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/forms/LoginForm.vue'
import GoogleButton from '@/components/buttons/GoogleButton.vue'
import Divider from '@/components/ui/Divider.vue'
import Logo from '@/components/ui/Logo.vue'
import { SITE_NAME } from '@/env'
import EasyLink from "@/components/buttons/EasyLink.vue";

/*METAS*/
document.title = 'Connexion | ' + SITE_NAME
</script>
