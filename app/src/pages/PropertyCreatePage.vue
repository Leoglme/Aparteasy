<template>
  <section id="create-property" class="py-10 grid gap-6 px-3">
    <Breadcrumb :items="breadcrumbs" class="mb-4"/>
    <h1 class="text-medium text-3xl">Ajouter une propriété à votre recherche</h1>
    <PropertyForm/>
  </section>
</template>

<script lang="ts" setup>
import PropertyForm from '@/components/forms/PropertyForm.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import { useSearchStore } from '@/stores/search.store'

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
    text: 'Nouvelle recherche',
    icon: 'plus',
    active: true
  }
]
</script>

<style lang="scss" scoped>
#create-property {
  max-width: 800px;
  margin: 0 auto;
}
</style>
