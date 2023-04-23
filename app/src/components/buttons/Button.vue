<template>
  <button class="btn gap-1" :class="classes" :style="styles" :data-variant="variant">
    <Icon style="margin-bottom: 0;" :stroke="iconStroke" :fill="iconFill" :name="startIcon" v-if="startIcon"/>
    <slot/>
    <Icon style="margin-bottom: 0;" :stroke="iconStroke" :fill="iconFill" :name="endIcon" v-if="endIcon"/>
  </button>
</template>


<script lang="ts" setup>
import Icon from '@/components/common/Icon.vue';
import { computed } from 'vue';

/*PROPS*/
const props = defineProps({
  variant: { type: String, default: 'primary' },
  background: { type: String, default: 'primary' },
  iconMode: { type: String, default: 'stroke' },
  color: { type: String, default: 'var(--light)' },
  endIcon: { type: String, default: null },
  small: { type: Boolean, default: false },
  square: { type: Boolean, default: false },
  startIcon: { type: String, default: null }
});

/*COMPUTED*/
const iconStroke = computed(() => props.iconMode === 'stroke' ? props.color : undefined)
const iconFill = computed(() => props.iconMode === 'fill' ? props.color : undefined)
const classes = computed(() => ({ 'btn-small': props.small, 'square': props.small }))
const styles = computed(() => ({ background: props.background, color: props.background }))
</script>
