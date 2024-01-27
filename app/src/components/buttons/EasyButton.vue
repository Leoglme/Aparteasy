<template>
  <component
      :is="computedTag"
      :to="to"
      :class="computedClasses"
  >
    <Icon
        v-if="showStartIcon"
        :name="startIcon"
        :width="iconSize"
        :height="iconSize"
        :stroke="iconStroke"
        :fill="iconFill"
        class="mb-0"
    />
    <slot v-if="!load"></slot>
    <Icon
        v-if="showEndIcon"
        :name="endIcon"
        :width="iconSize"
        :height="iconSize"
        :stroke="iconStroke"
        :fill="iconFill"
        class="btn__icon--right mb-0"
    />
    <Spinner v-if="load" :size="32" stroke="#f5f4fb" />
  </component>
</template>


<script lang="ts" setup>
import Icon from '@/components/ui/Icon.vue';
import Spinner from '@/components/ui/Spinner.vue';
import {computed } from 'vue';
import type { ComputedRef, PropType } from 'vue';

type Variant = 'primary' | 'cyan' | 'amber' | 'red' | 'green' | 'dashed' | 'slate-700';

/* PROPS */
const props = defineProps({
  variant: { type: String as PropType<Variant>, default: 'primary' },
  to: { type: [String, Object], default: null },
  externalLink: { type: Boolean, default: false },
  iconMode: { type: String, default: 'stroke' },
  color: { type: String, default: '#f5f4fb' },
  disabled: { type: Boolean, default: false },
  endIcon: { type: String, default: null },
  small: { type: Boolean, default: false },
  square: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  load: { type: Boolean, default: false },
  startIcon: { type: String, default: null }
});


/* COMPUTED */
const iconStroke: ComputedRef<string | undefined> = computed(() => props.iconMode === 'stroke' ? props.color : undefined);
const iconSize: ComputedRef<16 | 22> = computed(() => props.small ? 16 : 22);
const iconFill: ComputedRef<string | undefined> = computed(() => props.iconMode === 'fill' ? props.color : undefined);

const computedTag: ComputedRef<'RouterLink' | 'a' | 'button'> = computed(() => {
  if (props.to) return 'RouterLink';
  if (props.externalLink) return 'a';
  return 'button';
});

const showStartIcon: ComputedRef<boolean> = computed(() => !!(props.startIcon && !props.load));
const showEndIcon: ComputedRef<boolean> = computed(() => !!(props.endIcon && !props.load));

const computedClasses: ComputedRef<string> = computed(() => {
  const baseClasses = ['gap-1', 'inline-flex', 'items-center', 'justify-center', 'font-medium', 'whitespace-nowrap', 'translate-z-0', 'relative', 'transition-colors-filter-transform', 'filter-brightness-100', 'active:translate-y-[2px]'];


  if (props.disabled) {
    baseClasses.push('grayscale', 'opacity-70', 'pointer-events-none');
  } else {
    baseClasses.push(props.load ? 'cursor-progress' : 'cursor-pointer');
  }

  const sizeClasses = props.small ? ['rounded', 'text-xs', 'h-fit'] : ['rounded-md', 'text-sm'];
  const paddingClasses = props.square ? ['h-10', 'w-10', 'min-h-10', 'min-w-10', 'rounded'] : props.small ? ['py-2', 'px-2.5'] : ['py-2.5', 'px-4'];

  return [...baseClasses, ...sizeClasses, ...paddingClasses, ...getVariantClasses()].join(' ');
});


/* METHODS */
function getVariantClasses(): string[] {
  if (props.outlined) {
    return getOutlinedVariantClasses(props.variant);
  } else {
    return getSolidVariantClasses(props.variant);
  }
}

function getOutlinedVariantClasses(variant: string): string[] {
  switch (variant) {
    case 'primary':
      return ['border', 'text-primary-400', 'border-primary-400', 'hover:border-transparent', 'active:text-neutral-50', 'hover:text-neutral-50', 'active:bg-primary-400', 'hover:bg-primary-500'];
    case 'cyan':
      return ['border', 'text-cyan-400', 'border-cyan-400', 'hover:border-transparent', 'hover:text-neutral-50', 'hover:bg-cyan-700', 'active:bg-cyan-400', 'active:text-neutral-50'];
    case 'amber':
      return ['border', 'text-amber-400', 'border-amber-400', 'hover:border-transparent', 'hover:text-gray-900', 'hover:bg-amber-700', 'active:bg-amber-400', 'active:text-gray-900'];
    case 'red':
      return ['border', 'text-red-400', 'border-red-400', 'hover:border-transparent', 'hover:text-neutral-50', 'hover:bg-red-700', 'active:bg-red-400', 'active:text-neutral-50'];
    case 'green':
      return ['border', 'text-green-400', 'border-green-400', 'hover:border-transparent', 'hover:text-gray-900', 'hover:bg-green-700', 'active:bg-green-400', 'active:text-gray-900'];
    case 'slate-700':
      return ['border', 'text-slate-700', 'border-slate-700', 'hover:border-transparent', 'hover:text-neutral-50', 'hover:bg-slate-800', 'active:bg-slate-700', 'active:text-neutral-50'];
    default:
      return ['border', 'text-primary-400', 'border-primary-400', 'hover:border-transparent', 'active:text-neutral-50', 'hover:text-neutral-50', 'active:bg-primary-400', 'hover:bg-primary-500'];
  }
}

function getSolidVariantClasses(variant: string): string[] {
  switch (variant) {
    case 'primary':
      return ['bg-primary-400', 'hover:bg-primary-500', 'active:bg-primary-400', 'text-neutral-50'];
    case 'cyan':
      return ['bg-cyan-400', 'hover:bg-cyan-500', 'active:bg-cyan-400', 'text-neutral-50'];
    case 'amber':
      return ['bg-amber-400', 'hover:bg-amber-500', 'active:bg-amber-400', 'text-gray-900'];
    case 'red':
      return ['bg-red-400', 'hover:bg-red-500', 'active:bg-red-400', 'text-neutral-50'];
    case 'green':
      return ['bg-green-400', 'hover:bg-green-500', 'active:bg-green-400', 'text-gray-900'];
    case 'slate-700':
      return ['bg-slate-700', 'hover:bg-slate-800', 'active:bg-slate-700', 'text-neutral-50'];
    case 'dashed':
      return ['border', 'border-dashed', 'hover:opacity-65', 'active:opacity-100', 'transition-opacity', 'duration-200'];
    default:
      return ['bg-primary-400', 'hover:bg-primary-500', 'active:bg-primary-400', 'text-neutral-50'];
  }
}
</script>


<style lang="scss">
.btn__icon--right {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
}
</style>
