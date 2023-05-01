<template>
  <div class="container-sm pt-10 grid gap-8">
    <div class="grid gap-4">
      <Breadcrumb :items="breadcrumbs" class="mb-4"/>
      <h1 class="text-medium text-3xl">Invitez des membres dans la recherche</h1>
      <p class="text-contrast-70">Invitez un ou plusieurs membres à votre recherche de propriété.</p>
    </div>

    <InviteForm :load="loadButton"
                class="container-sm"
                :emails="emails"
                @update:emails="emails = $event"
                @submit="inviteUsers"/>
  </div>
</template>

<script lang="ts" setup>
import InviteForm from '@/components/forms/InviteForm.vue'
import { ref } from 'vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import { useSearchStore } from '@/stores/search.store'
import { useRouter } from 'vue-router'
/*REFS*/
const emails = ref([''])
const loadButton = ref(false)

/*HOOKS*/
const router = useRouter()

/*STORE*/
const searchStore = useSearchStore()
/*DATA*/
const breadcrumbs = [
  {
    text: 'Mes recherches',
    icon: 'search',
    to: { name: 'searches' }
  },
  {
    text: 'Invitations',
    icon: 'mail',
    active: true
  }
]

/*MIDDLEWARE*/
if (!searchStore.isSearchCreator) {
  router.push({ name: 'properties' })
}

/*API*/
const inviteUsers = async () => {
  loadButton.value = true
  await searchStore.inviteUsers(emails.value.filter(email => email !== ''))
  loadButton.value = false
  emails.value = ['']
}
</script>
