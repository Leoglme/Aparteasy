<template>
  <div class="p-10 w-full flex flex-col items-center gap-8">
    <h1 class="text-medium text-3xl">Choisir votre recherche</h1>
    <Button :to="{name: 'createSearch'}" startIcon="plus">Nouvelle recherche</Button>
    <section id="searches">
      <div class="flex flex-col gap-6" v-if="searches.length">
        <SearchCard v-for="search in searches" :key="search.id" :search="search"/>
      </div>
      <h3 class="text-xl" v-else>Aucune recherche de propriétés</h3>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/buttons/Button.vue";
import { SITE_NAME } from '@/env'
import { useSearchStore } from '@/stores/search.store'
import SearchCard from '@/components/cards/SearchCard.vue'

/*METAS*/
document.title = 'Mes recherches | ' + SITE_NAME

/*STORE*/
const searchStore = useSearchStore()
const searches = searchStore.searches
</script>
