<template>
  <div class="grid columns px-3 xs:px-6 py-8 items-center gap-10">
    <Breadcrumb :items="breadcrumbs" />

    <header class="flex flex-col sm:flex-row flex-wrap justify-between gap-6">
      <div class="flex flex-col justify-center gap-6 sm:flex-row sm:justify-start sm:items-center">
        <h1 v-if="propertyStore.property.name" class="font-medium text-2xl">
          <Icon name="home" stroke="#f5f4fb" />
          <span class="ml-2">{{ propertyStore.property.name }}</span>
        </h1>
        <LocationMarker
          v-if="propertyStore.property.location"
          address
          :location="propertyStore.property.location"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <Button startIcon="edit" variant="blue" :to="{ name: 'editProperty' }"> Modifier </Button>
        <Button startIcon="trash" variant="red" @click="isOpenModal = true">Supprimer</Button>
        <Button
          v-if="propertyStore.property.url"
          startIcon="link"
          :href="propertyStore.property.url"
          externalLink
          target="_blank"
        >
          Voir l’annonce
        </Button>
      </div>
    </header>

    <section id="infos__container" class="flex flex-col xl:flex-row-reverse justify-start gap-10">
      <div class="infos__left flex flex-col gap-8 justify-start flex-1">
        <div class="grid gap-3">
          <h1 class="font-medium text-lg flex items-center gap-2">
            <Icon
              name="pocket"
              :width="20"
              :height="20"
              stroke="#00f593"
              style="margin-bottom: 0"
            />
            <span>Statuts</span>
          </h1>

          <section class="flex items-center gap-6 flex-wrap" id="statuses">
            <div class="flex items-center gap-3">
              <Switch
                :value="propertyStore.property.available"
                @update:value="updateProperty({ available: $event })"
              />
              <AvailableBadge :value="propertyStore.property.available" />
            </div>
            <div class="flex items-center gap-3">
              <Switch
                :value="propertyStore.property.contacted"
                @update:value="updateProperty({ contacted: $event })"
              />
              <ContactedBadge :value="propertyStore.property.contacted" />
            </div>
          </section>
        </div>

        <div class="grid gap-3">
          <h1 class="font-medium text-lg flex items-center gap-2">
            <Icon
              name="star"
              :width="20"
              :height="20"
              stroke="#ffb836"
              style="margin-bottom: 0"
            />
            <span>Notes</span>
          </h1>

          <RatingsCard
            :averageRatings="propertyStore.property.average_ratings"
            :qualityRating="propertyStore.property.quality_rating"
            @update:qualityRating="updateQualityRating($event)"
            @update:userRating="updateUserRating($event)"
            :ratings="propertyStore.property.ratings"
          />
        </div>
      </div>
      <div class="infos__right grid gap-3 w-full">
        <h1 class="font-medium text-lg flex items-center gap-2">
          <Icon
            name="map-pin"
            :width="20"
            :height="20"
            stroke="var(--blue)"
            style="margin-bottom: 0"
          />
          <span>Localisation</span>
        </h1>

        <GoogleMap v-if="locationPairs.length > 0" :locations="locationPairs" />

        <div class="flex items-center flex-wrap gap-6 mt-8" v-if="showTravelTimes">
          <div
            v-for="(location, index) in propertyStore.property.locations"
            :key="index"
            class="flex flex-col gap-3 bg-slate-900 py-3 px-3 xs:px-5 rounded-lg sm:w-full"
          >
            <span v-if="location.userLocation" class="text-contrast-700 mb-2">
              <span v-if="location.userLocation.name">
                Durée trajet depuis <b class="text-light">{{ location.userLocation.name }}</b
                >:
              </span>
              <span v-else> Durée trajet depuis: </span>
            </span>
            <LocationMarker
              v-if="location.userLocation"
              address
              :location="location.userLocation.location"
            />
            <TravelTimesDisplay v-if="location.travelTimes" :travelTimes="location.travelTimes" />
          </div>
        </div>
      </div>
    </section>

    <ConfirmDeletePropertyModal
      :property-to-delete="propertyStore.property"
      :open="isOpenModal"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { SITE_NAME } from '@/env'
import GoogleMap from '@/components/maps/GoogleMap.vue'
import Icon from '@/components/ui/Icon.vue'
import LocationMarker from '@/components/ui/LocationMarker.vue'
import Switch from '@/components/inputs/Switch.vue'
import AvailableBadge from '@/components/ui/badges/AvailableBadge.vue'
import ContactedBadge from '@/components/ui/badges/ContactedBadge.vue'
import Button from '@/components/buttons/EasyButton.vue'
import RatingsCard from '@/components/cards/RatingsCard.vue'
import TravelTimesDisplay from '@/components/ui/TravelTimesDisplay.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { useRoute } from 'vue-router'
import { usePropertyStore } from '@/stores/property.store'
import { computed, ref } from 'vue'
import ConfirmDeletePropertyModal from '@/components/modals/ConfirmDeletePropertyModal.vue'

/*HOOKS*/
const route = useRoute()

/*Store*/
const propertyStore = usePropertyStore()

/*REFS*/
const isOpenModal = ref(false)

/*DATA*/
const searchId = route.params.searchId
const breadcrumbs = [
  {
    text: 'Propriétés',
    icon: 'home',
    to: { name: 'properties', params: { id: searchId } }
  },
  {
    text: 'Informations propriété',
    icon: 'info',
    active: true
  }
]

/*COMPUTED*/
const showTravelTimes = computed(() => {
  return propertyStore.property?.locations?.length > 0
})

// Compute location pairs for GoogleMap
const locationPairs = computed(() => {
  let pairs = []

  // If the property has a location, it is added to pairs.
  if (propertyStore.property?.location && !propertyStore.property?.locations.length) {
    pairs.push({
      start: propertyStore.property.location,
      end: propertyStore.property.location
    })
  }

  // If the property has several locations, they are added to pairs.
  if (propertyStore.property?.locations && propertyStore.property?.locations.length > 0) {
    pairs = pairs.concat(
      propertyStore.property.locations.map((location) => {
        return {
          start: location.userLocation.location,
          end: propertyStore.property.location
        }
      })
    )
  }

  return pairs
})

/*METAS*/
let prefix = 'Informations propriété'
if (propertyStore.property?.location?.address) {
  prefix += ` ${propertyStore.property.location.address}`
}
document.title = `${prefix} | ${SITE_NAME}`

/*METHODS*/
const updateQualityRating = (value: number) => {
  updateProperty({ quality_rating: value })
  propertyStore.updateAverageRating()
}
const closeModal = async () => {
  isOpenModal.value = false
}
const updateProperty = (value: { [key: string]: string | boolean | number }) => {
  propertyStore.updateProperty(
    { ...propertyStore.property, ...value },
    propertyStore.property.id,
    Number(searchId)
  )
}
const updateUserRating = (value: number) => {
  propertyStore.updateUserRating(value, propertyStore.property.id, Number(searchId))
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/core/mixins';

.infos__right {
  @include up(1000) {
    width: 65%;
  }
}
</style>
