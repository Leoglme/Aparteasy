<template>
  <div class="grid columns px-3 xs:px-6 py-8 items-center gap-6">
    <header class="grid columns gap-3 pb-6">
      <Breadcrumb :items="breadcrumbs" class="mb-4"/>
      <div class="flex items-center flex-wrap gap-4 justify-between property__subheader">
        <h1 class="text-medium text-2xl flex items-center gap-2">
          <Icon name="home" stroke="var(--light)" style="margin-bottom: 0;"/>
          <span>Liste des propriétés</span>
        </h1>
        <SearchBar title="Nom, Ville, Adresse, Commentaire, Prix"/>

        <div class="flex flex-wrap items-center gap-3 property__actions">
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


    <section id="properties" class="grid columns gap-6">
      <template v-if="propertyStore.properties.length > 0">
        <div v-for="(property, index) in propertyStore.properties"
             :key="`property-${index}`"
             class="h-full">
          <PropertyCard
              @delete="onClickDelete"
              :property="property"
              @setQualityRating="setQualityRating"
              v-if="property"
          />
        </div>
      </template>

      <div class="flex items-center gap-3 mt-8 flex-col" v-else>
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="var(--red)" stroke="none">
            <path d="M2480 4944 c-30 -8 -71 -25 -90 -38 -39 -26 -2242 -2033 -2332 -2126 -50 -49 -58 -63 -58 -95 0 -75 91 -129 156 -92 12 7 527 474 1145 1038 618 564 1146 1045 1172 1067 63 55 107 57 164 10 21 -18 549 -499 1172 -1068 623 -569 1143 -1040 1155 -1047 41 -23 85 -16 122 21 39 39 45 85 18 125 -17 23 -2276 2090 -2349 2148 -75 61 -183 83 -275 57z"/>
            <path d="M2313 3960 c-77 -16 -122 -50 -159 -120 -17 -31 -19 -64 -22 -267 -4 -291 2 -330 67 -394 28 -29 61 -51 86 -58 53 -15 497 -15 550 0 25 7 58 29 86 58 65 64 71 103 67 394 -3 215 -5 235 -25 272 -25 47 -54 75 -103 101 -31 16 -64 19 -270 21 -129 1 -254 -2 -277 -7z m457 -420 l0 -210 -210 0 -210 0 0 210 0 210 210 0 210 0 0 -210z"/>
            <path d="M3576 2890 c-330 -42 -611 -182 -843 -423 -250 -259 -383 -589 -383 -951 0 -229 42 -411 140 -613 195 -400 573 -682 1014 -758 113 -19 347 -20 457 0 443 77 812 351 1013 754 101 201 140 371 140 611 0 178 -14 275 -61 424 -151 478 -577 854 -1068 941 -109 19 -315 27 -409 15z m434 -238 c162 -43 341 -130 440 -212 l35 -29 -825 -826 -825 -826 -32 38 c-129 152 -228 422 -240 653 -29 579 362 1087 932 1210 123 27 402 23 515 -8z m689 -477 c323 -467 261 -1096 -147 -1501 -351 -348 -906 -434 -1347 -209 -82 42 -215 131 -215 143 0 12 1643 1651 1650 1647 4 -3 31 -38 59 -80z"/>
            <path d="M687 2669 c-49 -28 -47 14 -47 -1221 0 -1098 1 -1155 19 -1194 23 -50 93 -111 140 -121 20 -5 407 -8 861 -8 755 0 828 1 851 17 62 40 62 133 0 175 l-34 23 -813 0 -814 0 0 1141 0 1141 -29 29 c-24 23 -38 29 -73 29 -24 0 -51 -5 -61 -11z"/>
          </g>
        </svg>
        <h2 class="text-medium text-xl">Aucune propriété</h2>
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
import { SITE_NAME } from '@/env'

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
const isOpenModal = ref(false)
const propertyToDelete = ref<Property | null>(null)

/*STORE*/
const propertyStore = usePropertyStore()


/*METAS*/
document.title = `Propriétés | ${SITE_NAME}`

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

<style lang="scss" scoped>
@import "@/assets/style/core/_mixins.scss";

#properties {
  grid-template-columns: repeat(auto-fit, 420px);

  @include down(1350) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include down(800) {
    grid-template-columns: auto;
  }
}

.property__subheader {
  @include down(700){
    flex-direction: column;
    align-items: flex-start;

    .search__bar {
      max-width: unset;
      width: 100%;
    }
    .property__actions {
      width: 100%;

      .btn {
        flex: 1;
      }
    }
  }
  @include down(500){
    gap: 24px;
    .property__actions {
      flex-direction: column;

      .btn {
        width: 100%;
      }
    }
  }
}
</style>
