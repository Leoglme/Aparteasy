<script setup lang="ts">
import { RouterView } from 'vue-router'
import Spinner from '@/components/ui/Spinner.vue'
import {useAppStore} from "@/stores/app.store";
</script>

<template>
  <RouterView name="Navbar" v-if="!useAppStore().pending" />
  <RouterView v-show="!useAppStore().pending" />
  <div class="w-full flex items-center justify-center min-h-screen" v-if="useAppStore().pending">
    <Spinner />
  </div>
  <RouterView name="Footer" v-if="!useAppStore().pending" />
</template>
