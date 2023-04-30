<template>
  <component :is="to ? 'RouterLink' : 'button'"
             :to="to"
             class="btn gap-1"
             :class="classes"
             :style="styles"
             :data-variant="variant">
    <Icon :width="iconSize" :height="iconSize" style="margin-bottom: 0;" :stroke="iconStroke" :fill="iconFill"
          :name="startIcon" v-if="startIcon"/>
    <slot/>
    <Icon :width="iconSize" :height="iconSize" class="btn__icon--right" :stroke="iconStroke" :fill="iconFill"
          :name="endIcon" v-if="endIcon"/>
  </component>
</template>


<script lang="ts" setup>
import Icon from '@/components/common/Icon.vue';
import { computed } from 'vue';

/*PROPS*/
const props = defineProps({
  variant: { type: String, default: 'primary' },
  background: { type: String, default: 'primary' },
  to: { type: [String, Object], default: null },
  iconMode: { type: String, default: 'stroke' },
  color: { type: String, default: 'var(--light)' },
  endIcon: { type: String, default: null },
  small: { type: Boolean, default: false },
  square: { type: Boolean, default: false },
  startIcon: { type: String, default: null }
});

/*COMPUTED*/
const iconStroke = computed(() => props.iconMode === 'stroke' ? props.color : undefined)
const iconSize = computed(() => props.small ? 16 : 22)
const iconFill = computed(() => props.iconMode === 'fill' ? props.color : undefined)
const classes = computed(() => ({
  'btn-small': props.small,
  'square': props.small && props.square,
  'btn-dashed': props.variant === 'dashed'
}))
const styles = computed(() => ({ background: props.background, color: props.background }))
</script>


<style lang="scss">
.btn__icon-- {
  &right {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }
}
</style>
