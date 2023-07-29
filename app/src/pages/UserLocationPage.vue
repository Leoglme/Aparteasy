<template>
  <div class="container-sm pt-10 grid gap-8 px-3">
    <div class="grid gap-4">
      <Breadcrumb :items="breadcrumbs" class="mb-4" />
      <h1 class="text-medium text-3xl" style="line-height: 40px">
        Lieux de départ pour votre recherche
      </h1>
      <p class="text-contrast-70">
        Lieu de référence pour calculer la distance entre un point de départ et les propriétés
        trouvées dans vos recherches.
      </p>
    </div>

    <UserLocationForm class="container-sm" />
  </div>
</template>

<script lang="ts" setup>
import UserLocationForm from '@/components/forms/UserLocationForm.vue'
import { ref } from 'vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { useRouterStore } from '@/stores/router.store'

/*REFS*/
const previousRoute = ref(useRouterStore().previousRoute)

const breadcrumbs = ref([
  {
    text: 'Retour',
    icon: 'arrow-left',
    to: previousRoute.value
  },
  {
    text: 'Invitations',
    icon: 'mail',
    active: true
  }
])
</script>
