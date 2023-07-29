<template>
  <section id="create-property" class="py-10 grid gap-6 px-3">
    <Breadcrumb :items="breadcrumbs" class="mb-4" />
    <h1 class="text-medium text-3xl">Modification propriété</h1>
    <PropertyForm :initial-values="propertyStore.property" @submit="updateProperty" />
  </section>
</template>

<script lang="ts" setup>
import PropertyForm from '@/components/forms/PropertyForm.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { useSearchStore } from '@/stores/search.store'
import type { UpdatePropertyCommand } from '@/services/property/property.model'
import { usePropertyStore } from '@/stores/property.store'
import { SITE_NAME } from '@/env'
import { useRouter } from 'vue-router'

/*HOOKS*/
const router = useRouter()

/*STORE*/
const searchStore = useSearchStore()
const propertyStore = usePropertyStore()

/*METAS*/
let prefix = 'Modification propriété'
if (propertyStore.property?.location?.address) {
  prefix += ` ${propertyStore.property.location.address}`
}
document.title = `${prefix} | ${SITE_NAME}`

/*DATA*/
const breadcrumbs = [
  {
    text: 'Propriétés',
    icon: 'home',
    to: { name: 'properties', id: searchStore.currentSearch?.id }
  },
  {
    text: 'Modification propriété',
    icon: 'edit',
    active: true
  }
]

/*METHODS*/
const updateProperty = async (property: UpdatePropertyCommand) => {
  const searchId = searchStore.currentSearch?.id
  const propertyId = propertyStore.property?.id
  if (searchId && propertyId) {
    await propertyStore.updateProperty(property, propertyId, searchId)
    await router.push({ name: 'properties', params: { searchId } })
  }
}
</script>

<style lang="scss" scoped>
#create-property {
  max-width: 800px;
  margin: 0 auto;
}
</style>
