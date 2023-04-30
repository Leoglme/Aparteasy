<template>
  <div class="container-sm pt-10 grid gap-6">
    <Breadcrumb :items="breadcrumbs" class="mb-4"/>
    <h1 class="text-medium text-3xl">Nouvelle Recherche</h1>
    <SearchForm/>
  </div>
</template>

<script lang="ts" setup>
import SearchForm from '@/components/forms/SearchForm.vue'
import Breadcrumb from '@/components/navigations/Breadcrumb.vue'

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
</script>
