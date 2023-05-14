<template>
    <div class="grid columns px-3 xs:px-6 py-8 items-center gap-10">
        <Breadcrumb :items="breadcrumbs"/>

        <header class="flex flex-col sm:flex-row flex-wrap justify-between gap-6">
            <div class="flex flex-col justify-center gap-6 sm:flex-row sm:justify-start sm:items-center">
                <h1 v-if="propertyStore.property.name" class="text-medium text-2xl">
                    <Icon name="home" stroke="var(--light)"/>
                    <span class="ml-2">{{ propertyStore.property.name }}</span>
                </h1>
                <LocationMarker v-if="propertyStore.property.location" address
                                :location="propertyStore.property.location"/>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
                <Button startIcon="edit" variant="blue" to="edit">Modifier</Button>
                <Button startIcon="trash" variant="red">Supprimer</Button>
                <Button v-if="propertyStore.property.url" startIcon="link" :href="propertyStore.property.url"
                        externalLink target="_blank">
                    Voir l’annonce
                </Button>
            </div>
        </header>


        <section id="infos__container" class="flex flex-col xl:flex-row-reverse justify-start gap-10">
            <div class="infos__left flex flex-col gap-8 justify-start flex-1">
                <div class="grid gap-3">
                    <h1 class="text-medium text-lg flex items-center gap-2">
                        <Icon name="pocket" :width="20" :height="20" stroke="var(--green)" style="margin-bottom: 0;"/>
                        <span>Statuts</span>
                    </h1>

                    <section class="flex items-center gap-6 flex-wrap" id="statuses">
                        <div class="flex items-center gap-3">
                            <Switch :value="propertyStore.property.available" @update:value="updateAvailable"/>
                            <AvailableBadge :value="propertyStore.property.available"/>
                        </div>
                        <div class="flex items-center gap-3">
                            <Switch :value="propertyStore.property.contacted" @update:value="updateContacted"/>
                            <ContactedBadge :value="propertyStore.property.contacted"/>
                        </div>
                    </section>
                </div>

                <div class="grid gap-3">
                    <h1 class="text-medium text-lg flex items-center gap-2">
                        <Icon name="star" :width="20" :height="20" stroke="var(--yellow)" style="margin-bottom: 0;"/>
                        <span>Notes</span>
                    </h1>
                    {{propertyStore.property.average_ratings}}
                    <RatingsCard :ratings="propertyStore.property.ratings"/>
                </div>
            </div>
            <div class="infos__right grid gap-3 w-full">
                <h1 class="text-medium text-lg flex items-center gap-2">
                    <Icon name="map-pin" :width="20" :height="20" stroke="var(--blue)" style="margin-bottom: 0;"/>
                    <span>Localisation</span>
                </h1>

                <GoogleMap v-if="startLocation"
                           :startLocation="startLocation"
                           :endLocation="endLocation"
                />

                <div class="grid gap-3" v-if="showTravelTimes && searchLocation">
                    <div class="flex flex-wrap gap-2">
                        <span class="text-contrast-70">Durée trajet depuis:</span>
                        <LocationMarker address :location="searchLocation"/>
                    </div>
                    <TravelTimesDisplay :travel-times="propertyStore.property.travelTimes"/>
                </div>
            </div>
        </section>
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
import Button from '@/components/buttons/Button.vue'
import RatingsCard from '@/components/cards/RatingsCard.vue'
import TravelTimesDisplay from '@/components/ui/TravelTimesDisplay.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { useRoute } from 'vue-router'
import { usePropertyStore } from '@/stores/property.store'
import { computed, ref } from 'vue'
import type { Location } from '@/services/location/location.model'
import { useSearchStore } from '@/stores/search.store'

/*HOOKS*/
const route = useRoute()


/*Store*/
const propertyStore = usePropertyStore()
const searchStore = useSearchStore()

/*REFS*/
const searchLocation = ref<Location | undefined>(searchStore.currentSearch?.location)

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
const startLocation = computed(() => {
    const location = propertyStore.property?.location
    if (!location) return undefined
    return { lat: location.lat, lng: location.lng }
})

const endLocation = computed(() => {
    if (!searchLocation.value) return undefined
    return { lat: searchLocation.value.lat, lng: searchLocation.value.lng }
})

const showTravelTimes = computed(() => {
    const hasTravelTimes = propertyStore.property?.travelTimes?.driving || propertyStore.property?.travelTimes?.transit || propertyStore.property?.travelTimes?.walking
    return searchLocation.value && hasTravelTimes
})


/*METAS*/
let prefix = 'Informations propriété'
if (propertyStore.property?.location?.address) {
    prefix += ` ${propertyStore.property.location.address}`
}
document.title = `${prefix} | ${SITE_NAME}`

/*METHODS*/
const updateAvailable = (value: boolean) => {
    propertyStore.updateProperty(
        { ...propertyStore.property, available: value },
        propertyStore.property.id,
        Number(searchId))
}
const updateContacted = (value: boolean) => {
    propertyStore.updateProperty(
        { ...propertyStore.property, contacted: value },
        propertyStore.property.id,
        Number(searchId))
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/core/mixins";

.infos__right {
  @include up(1000) {
    width: 65%;
  }
}

</style>
