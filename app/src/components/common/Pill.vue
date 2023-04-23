<template>
  <div :style="style" class="pill" v-if="!appStore.pending">
    {{ text }}
  </div>
  <div class="loader skeleton--pill" v-else/>
</template>

<script lang="ts" setup>
import { alphaColor } from "@/services/color";
import { useAppStore } from "@/stores/app.store";
/*STORE*/
const appStore = useAppStore()
const props = defineProps({
  color: { type: String, default: 'primary' },
  text: { type: String, default: null },
  type: { type: String, default: 'outlined' }
})
const color = getComputedStyle(document.body).getPropertyValue(`--${props.color}`)
const style = props.type === 'outlined' ?
    { color, border: `1px solid ${color}` } :
    { color, backgroundColor: alphaColor(color, 0.1) }
</script>

<style scoped>
.pill {
  padding: 0 10px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
}
</style>
