<template>
  <div :style="style" class="pill text-medium px-4 py-1 w-fit text-center text-xs">
   <slot/>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
/*STORE*/
const props = defineProps({
  color: { type: String, default: '#00CC7A' },
  backgroundColor: { type: String, default: '#CCFFEB' },
  text: { type: String, default: null },
  type: { type: String as PropType<'filled' | 'outlined'>, default: 'filled' }
})

const style = props.type === 'outlined' ?
    { color: props.color, border: `1px solid ${props.color}` } :
    { color: props.color, backgroundColor: props.backgroundColor }
</script>

<style scoped>
.pill {
  border-radius: 4px;
}
</style>
