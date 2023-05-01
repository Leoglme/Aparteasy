<template>
  <div class="p-10 w-full flex flex-col items-center gap-8">
    <h1 class="text-medium text-3xl">Choisir votre recherche</h1>
    <Button :to="{name: 'createSearch'}" startIcon="plus">Nouvelle recherche</Button>
    <section id="searches" class="min-w-md">
      <div class="flex flex-col gap-6 grid" v-if="searchStore.searches.length">
        <SearchCard v-for="search in searchStore.searches" :key="search.id" :search="search" @delete="onClickDelete"/>
      </div>
      <h3 class="text-xl" v-else>Aucune recherche de propriétés</h3>
    </section>
  </div>
  <ConfirmDeleteSearchModal
      v-if="searchToDelete"
      :searchToDelete="searchToDelete"
      :open="isOpenModal"
      @close="closeModal"
  />
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/Button.vue';
import { SITE_NAME } from '@/env'
import { useSearchStore } from '@/stores/search.store'
import SearchCard from '@/components/cards/SearchCard.vue'
import type { Search } from '@/services/search/search.model'
import { ref } from 'vue'
import ConfirmDeleteSearchModal from '@/components/Modal/ConfirmDeleteSearchModal.vue'

/*METAS*/
document.title = 'Mes recherches | ' + SITE_NAME

/*STORE*/
const searchStore = useSearchStore()

/*REFS*/
const isOpenModal = ref(false)
const searchToDelete = ref<Search | null>(null)

/*METHODS*/
const closeModal = () => {
  isOpenModal.value = false
  searchToDelete.value = null
}
const onClickDelete = (search: Search) => {
  searchToDelete.value = search
  isOpenModal.value = true
}
</script>
