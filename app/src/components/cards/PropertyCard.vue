<template>
  <RouterLink :to="{ name: 'properties', params: { id: props.property.id }}" class="bg-grey-500 flex flex-col search-card h-full
  b-2 hover:border-primary-light border-transparent cursor-pointer rounded-lg">

    <!--  Header  -->
    <header class="flex justify-center flex-col h-fit gap-3 bb-1 border-contrast-30 p-3">
        <div class="flex items-center gap-2" v-if="props.property.name">
          <Icon :width="18" :height="18" stroke="var(--light)" name="home" style="margin-bottom: 0;"/>
          <h4 class="text-medium">{{ props.property.name }}</h4>
        </div>

        <LocationMarker address :location="props.property.location"/>
    </header>

    <div class="flex flex-col p-3 gap-3 h-full">
      <div class="flex items-center gap-4">
          <span>{{ props.property.number_of_rooms }} pièce(s) - <span>{{ props.property.surface_area }}m<span
              class="text-lg">²</span></span></span>
      </div>
      <StatusBadges :available="props.property.available" :contacted="props.property.contacted"/>

      <span class="flex items-center gap-2">
        <span>
          <span class="text-contrast-70">Prix:</span>
          {{ props.property.price || 0 }}€
      </span>
     <span>-</span>
     <span><span class="text-contrast-70">Charges:</span> {{ props.property.amount_of_charges || 0 }}€</span></span>

      <div class="flex items-center flex-wrap gap-2">
        <span class="text-contrast-70">Note moyenne:</span>
        <StarRatings
            :value="props.property.quality_rating"
            @update:value="setQualityRating($event)"
        />
      </div>

      <div class="flex items-center flex-wrap gap-2">
        <span v-if="props.property.availability_date">Disponible le {{
            formatDate(props.property.availability_date, 'dd/MM/yyyy')
          }}</span> <span v-if="props.property.availability_date">-</span>
        <span>Ajouté le {{ formatDate(props.property.created_at, 'dd/MM/yyyy') }}</span>
      </div>

      <div v-if="searchLocation">
        <div class="flex flex-wrap gap-2">
          <span class="text-contrast-70">Durée trajet depuis:</span>
          <LocationMarker address :location="props.property.location"/>
        </div>

        <TravelTimesDisplay :travel-times="{
          driving: 7136,
          walking: 3600,
          transit: 3600
        }"/>
      </div>

      <div class="grid gap-2" v-if="props.property.comment">
        <span class="text-contrast-70">Commentaire:</span>
        <span>{{ props.property.comment }}</span>
      </div>

      <div class="flex flex-col justify-end gap-2 mt-2 h-full">
        <Button variant="red"
                startIcon="trash"
                @click.prevent="deleteProperty">
          Supprimer
        </Button>

        <Button startIcon="link" :href="props.property.url" externalLink @click.prevent="openPropertyUrl" target="_blank">
          Voir l’annonce
        </Button>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Property } from '@/services/property/property.model';
import LocationMarker from '@/components/common/LocationMarker.vue'
import Icon from '@/components/common/Icon.vue'
import Button from '@/components/buttons/Button.vue'
import StatusBadges from '@/components/common/StatusBadges.vue'
import StarRatings from '@/components/fields/Rating/StarRatings.vue'
import TravelTimesDisplay from '@/components/common/TravelTimesDisplay.vue'
import { useSearchStore } from '@/stores/search.store'
import { ref } from 'vue'
import { formatDate } from '@/filters/dates'

/*STORE*/
const searchStore = useSearchStore()

/*REF*/
const searchLocation = ref(searchStore.currentSearch?.location)

/*PROPS*/
const props = defineProps({
  property: {
    type: Object as PropType<Property>,
    required: true
  }
})

/*EMIT*/
const emit = defineEmits(['delete', 'setQualityRating'])

/*METHODS*/
const deleteProperty = () => {
  emit('delete', props.property)
}

const openPropertyUrl = () => {
  window.open(props.property.url, '_blank')
}

const setQualityRating = (value: number) => {
  emit('setQualityRating', { id: props.property?.id, value })
}
</script>
