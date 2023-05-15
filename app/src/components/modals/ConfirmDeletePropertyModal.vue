<template>
    <ConfirmModal @confirm="deleteProperty" @close="emit('close')" :open="props.open">
        <template #title>Demande de confirmation</template>
        <template #content>
            Voulez-vous vraiment supprimer votre propriété {{ props.propertyToDelete.name }} ?
        </template>
    </ConfirmModal>
</template>

<script lang="ts" setup>
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import { defineProps, defineEmits } from 'vue'
import type { Property } from '@/services/property/property.model'
import { usePropertyStore } from '@/stores/property.store'

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
        required: true
    },
    propertyToDelete: {
        type: Object as () => Property,
        required: true
    }
})

/*EMIT*/
const emit = defineEmits(['close'])

/*METHODS*/
const deleteProperty = async () => {
    await usePropertyStore().deleteProperty(props.propertyToDelete?.id)
    emit('close')
}
</script>
