<template>
  <div :style="style" class="pill font-medium px-4 py-1 w-fit text-center text-xs">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
/*STORE*/
const props = defineProps({
  color: { type: String, default: '#00CC7A' },
  backgroundColor: { type: String, default: '#CCFFEB' },
  text: { type: String, default: null },
  type: { type: String as PropType<'filled' | 'outlined'>, default: 'filled' }
})

const style = computed(() => {
  return {
    color: props.color,
    backgroundColor: props.backgroundColor,
    border: props.type === 'outlined' ? `1px solid ${props.color}` : 'none'
  }
})
</script>

<style scoped>
.pill {
  border-radius: 4px;
}
</style>
