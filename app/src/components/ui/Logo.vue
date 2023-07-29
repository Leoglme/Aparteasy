<template>
  <div class="logo">
    <img :width="size" :height="size" src="/images/logo-color.png" :alt="SITE_NAME + ' logo'" />
    <span class="logo-text" v-if="props.large">{{ SITE_NAME }}</span>
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

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  gap: space(0.5);

  img {
    margin-right: 4px;
  }
}
.logo-text {
  font-size: 20px;
  font-weight: 500;
  color: var(--contrast, #fff);
}
</style>
