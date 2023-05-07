<template>
  <div class="grid columns p-6 items-center gap-6">
    <header class="grid columns gap-3 pb-6">
      <Breadcrumb :items="breadcrumbs" class="mb-4"/>
      <div class="flex items-center justify-between">
        <h1 class="text-medium text-2xl flex items-center gap-2">
          <Icon name="home" stroke="var(--light)" style="margin-bottom: 0;"/>
          <span>Liste des propriétés</span>
        </h1>
        <SearchBar v-model:value="search"/>

        <div class="flex flex-wrap items-center gap-3">
          <Button
              :to="{name: 'inviteSearch'}"
              variant="grey-400"
              class="gap-2" start-icon="user-plus">
            Inviter utilisateurs
          </Button>
          <Button
              :to="{name: 'createProperty'}"
              class="gap-2" start-icon="plus">
            Ajouter une propriété
          </Button>

        </div>
      </div>
    </header>


    <section id="properties" class="grid columns xl:col-2 gap-6">
      <div v-for="(property, index) in propertyStore.properties" :key="`property-${index}`" class="h-full">
        <PropertyCard
            @delete="onClickDelete"
            :property="property"
            @setQualityRating="setQualityRating"
            v-if="property"
        />
      </div>
    </section>
  </div>
  <ConfirmDeletePropertyModal
      v-if="propertyToDelete"
      :property-to-delete="propertyToDelete"
      :open="isOpenModal"
      @close="closeModal"
  />
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/Button.vue'
import { usePropertyStore } from '@/stores/property.store';
import PropertyCard from '@/components/cards/PropertyCard.vue';
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'
import Icon from '@/components/common/Icon.vue'
import SearchBar from '@/components/fields/SearchBar.vue'
import { ref } from 'vue'
import type { Property } from '@/services/property/property.model'
import ConfirmDeletePropertyModal from '@/components/Modal/ConfirmDeletePropertyModal.vue'

/*DATA*/
const breadcrumbs = [
  {
    text: 'Mes recherches',
    icon: 'search',
    to: { name: 'searches' }
  },
  {
    text: 'Propriétés',
    icon: 'home',
    active: true
  }
]

/*REF*/
const search = ref('')
const isOpenModal = ref(false)
const propertyToDelete = ref<Property | null>(null)

/*STORE*/
const propertyStore = usePropertyStore()

/*METHODS*/
const setQualityRating = (params: { id: number, value: number }) => {
  const property = propertyStore.findPropertyById(params.id)
  if (!property) return
  propertyStore.updateProperty({ ...property, quality_rating: params.value })
}

const closeModal = () => {
  isOpenModal.value = false
  propertyToDelete.value = null
}

const onClickDelete = (property: Property) => {
  propertyToDelete.value = property
  isOpenModal.value = true
}
</script>
