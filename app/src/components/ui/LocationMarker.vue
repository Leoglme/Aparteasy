<template>
  <h6 :title="props.location.address" class="location-marker text-regular text-sm grid items-center gap-1">
    <Icon name="map-pin" :width="18" :height="18" stroke="var(--yellow)" style="margin-bottom: -0px;"/>
    {{ text }}
  </h6>
</template>

<script lang="ts" setup>
import Icon from '@/components/ui/Icon.vue'
import type { PropType } from 'vue';
import type { Location } from '@/services/location/location.model'
import { computed } from 'vue'

/*PROPS*/
const props = defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true
  },
  address: {
    type: Boolean,
    default: false
  }
})

/*COMPUTED*/
const text = computed(() => {
   if (props.address) {
     return props.location?.address + ' - ' + props.location?.city
   }
  return props.location?.city || props.location?.address
})
</script>

<style scoped>
.location-marker {
  grid-template-columns: auto 1fr;
}
</style>
