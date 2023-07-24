<template>
    <div class="grid gap-3">
        <FormInput
                v-model:value="locationName"
                id="locationName"
                placeholder="Mon école"
        />
        <GooglePlacesAutocomplete
                placeholder="22 Bd Saint-Conwoïon, 35000 Rennes"
                @place-selected="updateLocation"
        />
    </div>
</template>

<script lang="ts" setup>
import FormInput from '@/components/inputs/FormInput.vue';
import GooglePlacesAutocomplete from '@/components/inputs/GooglePlacesAutocomplete.vue'
import { ref, defineEmits } from 'vue'
import type { Location } from '@/services/location/location.model'

const emits = defineEmits(['update'])

const locationName = ref('')
const location = ref(undefined as Location | undefined)

const updateLocation = (place: Location) => {
    location.value = place
    emits('update', { name: locationName.value, location: place })
}
</script>

<style scoped>
.location-helping {
    letter-spacing: 0.02em;
    line-height: 20px;
}
</style>
