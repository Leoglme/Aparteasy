<template>
  <div
      class="avatar"
      :style="styles"
      :class="{ clickable }"
  >
    <span
        v-if="online"
        class="status-online"
    />
    <slot/>
    <img
        v-if="src"
        :style="{ borderRadius }"
        :src="src"
        :alt="alt"
    />
    <Icon :width="styles.iconSize"
          :height="styles.iconSize"
          :stroke="iconStroke"
          style="margin-bottom: 0;"
          :fill="iconFill"
          :name="props.icon"
          v-else-if="props.icon"/>
  </div>
</template>
<script setup lang="ts">
import Icon from '@/components/common/Icon.vue'
import { computed } from 'vue'
/* Props */
const props = defineProps({
  size: { type: [String, Number], default: '2.5rem' },
  borderRadius: { type: String, default: '20%' },
  icon: { type: String, default: null },
  iconMode: { type: String, default: 'stroke' },
  color: { type: String, default: 'var(--contrast-70)' },
  src: { type: String, default: null },
  alt: { type: String, default: null },
  online: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false },
})
const styles = {
  width: props.size,
  height: props.size,
  fontSize: `calc(${props.size} / 2.5)`,
  borderRadius: props.borderRadius,
  iconSize: `calc(${props.size} * 0.8)`
}
/*COMPUTED*/
const iconStroke = computed(() => props.iconMode === 'stroke' ? props.color : undefined)
const iconFill = computed(() => props.iconMode === 'fill' ? props.color : undefined)
</script>


<style lang="scss" scoped>
.avatar {
  position: relative;
  background: var(--grey-400);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
}
</style>
