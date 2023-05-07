<template>
  <div class="flex flex-wrap items-center gap-1" v-if="props.location" :title="props.location.address">
    <Icon name="map-pin" :width="18" :height="18" stroke="var(--yellow)" style="margin-bottom: -0px;"/>
    <h6 class="text-regular text-sm">{{ props.location.city || props.location.address }}</h6>
  </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/common/Icon.vue'
import type { PropType } from "vue";
import type { Location } from '@/services/location/location.model'

const props = defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true
  }
})
</script>
