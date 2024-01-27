<template>
  <div class="flex items-center">
    <img :width="size"
         :height="size"
         src="/images/logo-color.png"
         class="mr-1"
         :alt="SITE_NAME + ' logo'" />
    <span class="text-white font-medium text-xl" v-if="props.large">{{ SITE_NAME }}</span>
  </div>
</template>

<script lang="ts" setup>
/*PROPS*/
import { SITE_NAME } from '@/env'

const props = defineProps({
  size: { type: [Number, String], default: 35 },
  large: { type: Boolean, default: false }
})
</script>