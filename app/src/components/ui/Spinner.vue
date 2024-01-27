<template>
  <svg class="spinner spinner-spiral" viewBox="0 0 64 64" :style="style">
    <g>
      <defs>
        <linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="35" y1="26" x2="2" y2="26">
          <stop offset="0.1" class="stop1"></stop>
          <stop offset="1" class="stop2"></stop>
        </linearGradient>
      </defs>
      <g stroke-width="4" stroke-linecap="round" fill="none">
        <path stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path>
        <path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path>
      </g>
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  stroke: { type: String, default: '#db0a61' },
  size: { type: Number, default: 56 }
})

const style = computed(() => ({
  stroke: props.stroke,
  width: `${props.size}px`,
  height: `${props.size}px`
}))
</script>

<style lang="scss" scoped>
$primary: #db0a61;
$slate700: #35424d;

.spinner {
  animation: spin linear infinite 0.9s;
}

.spinner .stop1 {
  stop-color: $slate700;
  stop-opacity: 0;
}

.spinner .stop2 {
  stop-color: $primary;
}
</style>
