<template>
  <div class="w-full flex items-center justify-center vh-100">
    <Spinner />
  </div>
</template>

<script lang="ts" setup>
import Spinner from '@/components/ui/Spinner.vue'
import { SITE_NAME } from '@/env'

/*METAS*/
document.title = `Acceptation invitation recherche.. | ${SITE_NAME}`
</script>
