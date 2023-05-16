<template>
  <section id="create-property" class="py-10 grid gap-6 px-3">
    <Breadcrumb :items="breadcrumbs" class="mb-4"/>
    <h1 class="text-medium text-3xl">Ajouter une propriété à votre recherche</h1>
    <PropertyForm @submit="createProperty"/>
  </section>
</template>

<script lang="ts" setup>
import PropertyForm from '@/components/forms/PropertyForm.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { useSearchStore } from '@/stores/search.store'
import type { PropertyCommand } from '@/services/property/property.model'
import { usePropertyStore } from '@/stores/property.store'
import { SITE_NAME } from '@/env'

/*STORE*/
const searchStore = useSearchStore()
const propertyStore = usePropertyStore()

/*METAS*/
document.title = `Création propriété | ${SITE_NAME}`

/*DATA*/
const breadcrumbs = [
  {
    text: 'Propriétés',
    icon: 'home',
    to: { name: 'properties', id: searchStore.currentSearch?.id }
  },
  {
    text: 'Nouvelle propriété',
    icon: 'plus',
    active: true
  }
]

/*METHODS*/
const createProperty = (property: PropertyCommand) => {
  propertyStore.createProperty(property)
}
</script>

<style lang="scss" scoped>
#create-property {
  max-width: 800px;
  margin: 0 auto;
}
</style>
