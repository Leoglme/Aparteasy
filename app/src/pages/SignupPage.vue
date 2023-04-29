<template>
  <section class="p-4">
    <div class="d-grid gap-3">
      <div class="container-xs flex flex-col">
        <Logo class="flex justify-center mb-8" large />
        <GoogleButton />
        <Divider class="mt-3" text="ou" />
      </div>
      <SignupForm />
    </div>

  </section>
</template>

<script lang="ts" setup>
import SignupForm from "@/components/forms/SignupForm.vue";
import GoogleButton from "@/components/buttons/GoogleButton.vue";
import Divider from "@/components/common/Divider.vue";
import Logo from "@/components/common/Logo.vue";
import { SITE_NAME } from '@/env'

document.title = 'Inscription | ' + SITE_NAME
</script>
