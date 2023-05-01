<template>
  <ConfirmModal @confirm="deleteSearch" @close="emit('close')" :open="props.open">
    <template #title>Demande de confirmation</template>
    <template #content>
      Voulez-vous vraiment supprimer votre recherche de propriétés {{ props.searchToDelete.name }} ?
    </template>
  </ConfirmModal>
</template>

<script lang="ts" setup>
import ConfirmModal from '@/components/Modal/ConfirmModal.vue'
import { defineProps, defineEmits } from 'vue'
import type { Search } from '@/services/search/search.model'
import { useSearchStore } from '@/stores/search.store'

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  searchToDelete: {
    type: Object as () => Search,
    required: true
  }
})

/*EMIT*/
const emit = defineEmits(['close'])

/*METHODS*/
const deleteSearch = async () => {
  await useSearchStore().deleteSearch(props.searchToDelete?.id)
  emit('close')
}
</script>
