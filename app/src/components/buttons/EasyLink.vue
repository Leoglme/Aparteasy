<template>
  <router-link class="text-primary-300 inline-flex relative no-underline hover:underline active:underline py-0.5 overflow-hidden"
               tabindex="-1" :to="props.to"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

/* PROPS */
const props = defineProps({
  to: { type: [String, Object], default: null }
});
</script>