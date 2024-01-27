<template>
  <div class="px-3 py-6 md:px-10 md:py-10 w-full flex flex-col items-center gap-8">
    <h1 class="font-medium text-xl sm:text-3xl text-center">Choisir votre recherche</h1>
    <Button
        :to="{ name: 'createSearch' }"
        startIcon="plus"
        class="w-full sm:w-auto"
    >
      Nouvelle recherche
    </Button>
    <section id="searches" class="max-w-md sm:min-w-[500px] w-full">
      <div class="flex flex-col gap-6" v-if="searchStore.searches.length">
        <SearchCard
          v-for="search in searchStore.searches"
          :key="search.id"
          :search="search"
          @delete="onClickDelete"
        />
      </div>
      <h3 class="text-xl text-center" v-else>Aucune recherche de propriétés</h3>
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
import Button from '@/components/buttons/EasyButton.vue'
import { SITE_NAME } from '@/env'
import { useSearchStore } from '@/stores/search.store'
import SearchCard from '@/components/cards/SearchCard.vue'
import type { Search } from '@/services/search/search.model'
import { ref } from 'vue'
import ConfirmDeleteSearchModal from '@/components/modals/ConfirmDeleteSearchModal.vue'

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
