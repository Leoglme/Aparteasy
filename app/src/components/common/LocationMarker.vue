<template>
  <h6 :title="props.location.address" class="location-marker text-regular text-sm grid items-center gap-1">
    <Icon name="map-pin" :width="18" :height="18" stroke="var(--yellow)" style="margin-bottom: -0px;"/>
    {{ props.location.city || props.location.address }}
  </h6>
</template>

<script lang="ts" setup>
import Icon from '@/components/common/Icon.vue'
import type { PropType } from 'vue';
import type { Location } from '@/services/location/location.model'

const props = defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true
  }
})
</script>

<style scoped>
.location-marker {
  grid-template-columns: auto 1fr;
}
</style>
