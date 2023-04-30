<template>
  <div class="p-10 w-full flex flex-col items-center gap-8">
    <div class="grid gap-4">
      <h1 class="text-medium text-3xl">Invitez des membres dans la recherche</h1>
      <p class="text-center text-contrast-70">Invitez un ou plusieurs membres à votre recherche de propriété.</p>
    </div>

    <InviteForm class="container-sm" :emails="emails" @update:emails="emails = $event" @submit="inviteUsers"/>
  </div>
</template>

<script lang="ts" setup>
import InviteForm from '@/components/forms/InviteForm.vue'
import { ref } from 'vue'
/*REFS*/
const emails = ref([''])

/*API*/
const inviteUsers = () => {
  console.log(emails.value.filter(email => email !== ''))
}
</script>
