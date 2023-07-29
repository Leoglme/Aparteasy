<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app.store'
import Spinner from '@/components/ui/Spinner.vue'
const appStore = useAppStore()
</script>

<template>
  <RouterView name="Navbar" v-if="!appStore.pending" />
  <RouterView v-if="!appStore.pending" />
  <div class="w-full flex items-center justify-center vh-100" v-else>
    <Spinner />
  </div>
  <RouterView name="Footer" v-if="!appStore.pending" />
</template>
