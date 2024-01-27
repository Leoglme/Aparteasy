<template>
  <div class="w-full m-inline-auto max-w-sm pt-10 grid gap-8 px-3">
    <div class="grid gap-4">
      <Breadcrumb :items="breadcrumbs" class="mb-4" />
      <h1 class="font-medium text-2xl sm:text-3xl">Invitez des membres dans la recherche</h1>
      <p class="text-contrast-700">
        Invitez un ou plusieurs membres à votre recherche de propriété.
      </p>
    </div>

    <InviteForm
      :load="loadButton"
      class="w-full m-inline-auto max-w-sm"
      :emails="emails"
      @update:emails="emails = $event"
      @submit="inviteUsers"
    />
  </div>
</template>

<script lang="ts" setup>
import InviteForm from '@/components/forms/InviteForm.vue'
import { ref } from 'vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { useSearchStore } from '@/stores/search.store'
import { SITE_NAME } from '@/env'
/*REFS*/
const emails = ref([''])
const loadButton = ref(false)

/*STORE*/
const searchStore = useSearchStore()

/*DATA*/
const breadcrumbs = [
  {
    text: 'Propriétés',
    icon: 'home',
    to: { name: 'properties', id: searchStore.currentSearch?.id }
  },
  {
    text: 'Invitations',
    icon: 'mail',
    active: true
  }
]

/*METAS*/
document.title = `Invitation recherche | ${SITE_NAME}`

/*API*/
const inviteUsers = async () => {
  loadButton.value = true
  await searchStore.inviteUsers(emails.value.filter((email) => email !== ''))
  loadButton.value = false
  emails.value = ['']
}
</script>
