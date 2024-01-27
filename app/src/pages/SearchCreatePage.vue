<template>
  <div class="w-full m-inline-auto max-w-sm pt-10 grid gap-6 px-3">
    <Breadcrumb :items="breadcrumbs" class="mb-4" />
    <h1 class="font-medium text-2xl sm:text-3xl">Nouvelle Recherche</h1>
    <SearchForm />
  </div>
</template>

<script lang="ts" setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { SITE_NAME } from '@/env'

const breadcrumbs = [
  {
    text: 'Mes recherches',
    icon: 'search',
    to: { name: 'searches' }
  },
  {
    text: 'Nouvelle recherche',
    icon: 'plus',
    active: true
  }
]

/*METAS*/
document.title = `Création recherche | ${SITE_NAME}`
</script>
