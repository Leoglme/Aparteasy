<template>
  <RouterLink :to="{ name: 'properties', params: { id: props.property.id }}" class="bg-grey-300 grid search-card h-full
  b-2 hover:border-primary-light border-transparent cursor-pointer rounded-lg">

    <!--  Header  -->
    <header class="flex items-center justify-between h-fit bb-1 border-contrast-30 py-3 px-5">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <Icon :width="18" :height="18" stroke="var(--light)" name="home" style="margin-bottom: 0;"/>
          <h4 class="text-medium">Property name</h4>
        </div>

        <LocationMarker :location="props.property.location"/>
      </div>

      <div class="flex items-center gap-3">
        <span>{{ props.property.created_at }}</span>
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
      <div class="flex flex-col gap-2">
        <span>{{property.number_of_bedrooms}} pièce(s) - <span>{{property.surface_area}}m<span class="text-lg">²</span></span></span>
        <span class="flex items-center gap-2"><span>Prix: {{property.price || 0}}€</span><span>Charges: {{property.charges || 0}}€</span></span>
      </div>
      <div>
        {{ property.statuses }}
      </div>

<!--      {{ property }}-->
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import LocationMarker from '@/components/common/LocationMarker.vue'
import Icon from '@/components/common/Icon.vue'
import Button from '@/components/buttons/Button.vue'
import type { Property } from "@/services/property/property.model";

/*PROPS*/
const props = defineProps({
  property: {
    type: Object as PropType<Property>,
    required: true
  }
})

/*EMIT*/
const emit = defineEmits(['delete'])

/*METHODS*/
const deleteProperty = () => {
  emit('delete', props.property)
}
</script>
