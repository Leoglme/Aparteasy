<template>
    <div class="container-sm pt-10 grid gap-8 px-3">
        <div class="grid gap-4">
            <Breadcrumb :items="breadcrumbs" class="mb-4"/>
            <h1 class="text-medium text-3xl">Lieu de départ pour votre recherche</h1>
            <p class="text-contrast-70">
                Lieu de référence pour calculer la distance entre un point de départ et les propriétés trouvées dans vos
                recherches.
            </p>
        </div>
        <ReferenceLocationForm
                :load="loadButton"
                class="container-sm"
                :locations="locations"
                @update:locations="locations = $event"
                @submit="updateReferenceLocation"/>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { useSearchStore } from '@/stores/search.store'
import { SITE_NAME } from '@/env'
import ReferenceLocationForm from '@/components/forms/ReferenceLocationForm.vue'
/*REFS*/
const locations = ref([{
    name: '',
    location: ''
}])
const loadButton = ref(false)

/*STORE*/
const searchStore = useSearchStore()

/*DATA*/
const breadcrumbs = [
    {
        text: 'Propriétés',
        icon: 'home',
        to: { name: 'properties', id: searchStore.currentSearch?.id }
    },
    {
        text: 'Lieux de départ',
        icon: 'map-pin',
        active: true
    }
]

/*METAS*/
document.title = `Lieu de départ pour votre recherche | ${SITE_NAME}`

/*API*/
const updateReferenceLocation = async () => {
    loadButton.value = true
    await searchStore.inviteUsers(emails.value.filter(email => email !== ''))
    loadButton.value = false
    emails.value = ['']
}
</script>
