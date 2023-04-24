<template>
  <section class="centered-screen p-2">
    <div class="container-xs">
      <Logo class="d-flex center-x mb-8" large/>
      <div class="d-flex column gap-3">
        <GoogleButton/>
        <Divider text="ou"/>
        <LoginForm/>
      </div>
      <h6 style="font-size: 16px;" class="text-medium mt-4 centered gap-2 wrap">Vous n'avez pas de compte ?
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
document.title = 'Login | ' + SITE_NAME
</script>
