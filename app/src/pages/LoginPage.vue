<template>
  <section class="p-4">
    <div class="container-xs">
      <Logo class="flex justify-center mb-8" large/>
      <div class="flex flex-col gap-4">
        <GoogleButton/>
        <Divider text="ou"/>
        <LoginForm/>
      </div>
      <h6 class="text-medium text-sm mt-6 centered gap-2 flex-wrap">Vous n'avez pas de compte ?
        <router-link class="link" to="/signup">S’inscrire</router-link>
      </h6>
    </div>
  </section>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/forms/LoginForm.vue'
import GoogleButton from '@/components/buttons/GoogleButton.vue'
import Divider from '@/components/common/Divider.vue'
import Logo from '@/components/common/Logo.vue'
import { SITE_NAME } from '@/env'

/*METAS*/
document.title = 'Connexion | ' + SITE_NAME
</script>
