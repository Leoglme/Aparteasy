<template>
  <RouterLink :to="{ name: 'properties', params: { id: props.property.id }}" class="bg-grey-300 grid search-card h-full
  b-2 hover:border-primary-light border-transparent cursor-pointer rounded-lg">

    <!--  Header  -->
    <header class="flex items-center justify-between h-fit bb-1 border-contrast-30 py-3 px-5">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2" v-if="props.property.name">
          <Icon :width="18" :height="18" stroke="var(--light)" name="home" style="margin-bottom: 0;"/>
          <h4 class="text-medium">{{ props.property.name }}</h4>
        </div>

        <LocationMarker :location="props.property.location"/>
      </div>

      <div class="flex items-center gap-3">
        <span>Ajouté le {{ formatDate(props.property.created_at, 'dd/MM/yyyy') }}</span>
        <Button title="Supprimer la propriété"
                small
                variant="red"
                startIcon="trash"
                @click.prevent="deleteProperty">
          Supprimer
        </Button>
      </div>
    </header>


    <div class="grid columns col-2 items-center py-3 px-5">
      <!--  col1    -->
      <div class="flex flex-col gap-2 h-full">
        <div class="flex items-center gap-4">
          <span>{{ props.property.number_of_rooms }} pièce(s) - <span>{{ props.property.surface_area }}m<span
              class="text-lg">²</span></span></span>
          <div class="flex items-center gap-2 flex-wrap">
            <Badge v-for="(status, index) in props.property.statuses"
                   :color="StatusInfos[status.name].color"
                   :backgroundColor="StatusInfos[status.name].backgroundColor"
                   :key="`${status}-${index}`">
              {{ StatusInfos[status.name].title }}
            </Badge>
          </div>
        </div>
        <span
            class="flex items-center gap-2"><span>Prix: {{ props.property.price || 0 }}€</span><span>Charges: {{ props.property.amount_of_charges || 0 }}€</span></span>

        <div class="flex items-center gap-2">
          <span>Rapport qualité prix:</span>
          <StarRatings
              :value="props.property.quality_rating"
              @update:value="setQualityRating($event)"
          />
        </div>

        <template v-for="rating in props.property.ratings">
          <div class="flex items-center gap-2" v-if="rating" :key="rating.id">
            <span>Antoine:</span>
            <StarRatings
                :value="rating.rating"
                @update:value="setQualityRating($event)"
            />
          </div>
        </template>
        <div class="flex items-center gap-2">
          <span>Moyenne:</span>
          <StarRatings
              :value="props.property.quality_rating"
              @update:value="setQualityRating($event)"
          />
        </div>
      </div>
      <!--  col2    -->
      <div class="flex flex-col gap-2 h-full">
        <span v-if="props.property.availability_date">Disponible le {{
            formatDate(props.property.availability_date, 'dd/MM/yyyy')
          }}</span>
        <div v-if="searchLocation">
          <span>Durée trajet depuis <span
              class="text-yellow">{{ searchLocation.address }} - {{ searchLocation.city }}</span></span>
        </div>
        <div class="grid gap-2" v-if="props.property.comment">
          <span>Commentaire:</span>
          <span>{{ props.property.comment }}</span>
        </div>
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
import Badge from '@/components/common/Badge.vue'
import { StatusInfos } from '@/utils/statuses'
import StarRatings from '@/components/fields/Rating/StarRatings.vue'
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

const setQualityRating = (value: number) => {
  emit('setQualityRating', { id: props.property?.id, value })
}
</script>
