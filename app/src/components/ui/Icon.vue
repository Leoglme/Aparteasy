<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 24 24`"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :style="`color: ${stroke || fill}`"
    :aria-labelledby="name"
  >
    <g :stroke="stroke ?? 'transparent'" :fill="fill ?? 'transparent'">
      <AsyncComp />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: [Number, String],
    default: 24
  },
  height: {
    type: [Number, String],
    default: 24
  },
  stroke: {
    type: String,
    default: null
  },
  fill: {
    type: String,
    default: null
  }
})
const AsyncComp = defineAsyncComponent(() => import(`@/components/icons/${props.name}.vue`))
</script>
<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px;
}
</style>
