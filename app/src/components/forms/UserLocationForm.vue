<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6" @submit="onSubmit">
    <div
      v-for="(userLocation, index) in userLocations"
      :key="`location-${index}`"
      class="grid gap-4"
    >
      <div class="flex gap-4">
        <div class="flex flex-col flex-1 gap-4">
          <FormInput
            :value="userLocation.name"
            @update:value="updateLocationName(index, $event)"
            class="flex-1"
            placeholder="Mon école"
            type="required"
            @keydown.enter.prevent
            :id="`name-${index + 1}`"
          />

          <GooglePlacesAutocomplete
            :id="`lieu-${index + 1}`"
            :initialPlace="userLocation.location.address"
            placeholder="22 Bd Saint-Conwoïon, 35000 Rennes"
            @place-selected="updateLocationAddress(index, $event)"
            @keydown.enter.prevent
            rules="required"
          />
        </div>

        <Button
          type="button"
          :title="`Remove Location ${index + 1}`"
          square
          small
          variant="red"
          startIcon="trash"
          @click.prevent="removeLocation(index)"
        />
      </div>
      <Divider v-if="index + 1 < userLocations?.length" />
    </div>

    <Button
      class="gap-2"
      type="button"
      @click.prevent="addLocation"
      startIcon="plus"
      variant="dashed"
    >
      Ajouter un lieu
    </Button>

    <Button :load="load" class="gap-2" :disabled="!meta.valid" type="submit">
      <span>Sauvegarder</span>
    </Button>
  </Form>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import Button from '@/components/buttons/EasyButton.vue'
import FormInput from '@/components/inputs/FormInput.vue'
import GooglePlacesAutocomplete from '@/components/inputs/GooglePlacesAutocomplete.vue'
import { nextTick, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import type { UserLocation } from '@/services/userLocation/userLocation.model'
import Divider from '@/components/ui/Divider.vue'
import { useUserLocationStore } from '@/stores/userLocation.store'
import type { LocationCommand } from '@/services/location/location.model'

type NewUserLocation = {
  name: string
  location: LocationCommand
}

/*REFS*/
const userLocations: Ref<UserLocation[]> | Ref<NewUserLocation[]> | Ref<never[]> = ref([])
const load = ref(false)

/*STORE*/
const userLocationStore = useUserLocationStore()

/*COMPUTED*/
// const showDeleteButtons = computed(() => userLocations.value.length > 1)

/* LIFECYCLE */
onMounted(async () => {
  await userLocationStore.getAllUserLocations()
  userLocations.value = userLocationStore.userLocations
  if (userLocations.value.length === 0) {
    addLocation()
  }
})

/*METHODS*/
const updateLocationName = (index: number, newName: string) => {
  userLocations.value = [
    ...userLocations.value.slice(0, index),
    { ...userLocations.value[index], name: newName },
    ...userLocations.value.slice(index + 1)
  ]
}

const updateLocationAddress = (index: number, newLocation: LocationCommand) => {
  const newUserLocations = [...userLocations.value]
  newUserLocations[index].location = newLocation
  userLocations.value = newUserLocations
}

const addLocation = () => {
  userLocations.value = [
    ...userLocations.value,
    {
      name: '',
      location: {
        address: '',
        city: '',
        region: '',
        country: '',
        lat: 0,
        lng: 0
      }
    }
  ]
  nextTick(() => {
    const lastLocationNameInput = document.querySelector(`#name-${userLocations.value.length}`)
    if (lastLocationNameInput instanceof HTMLInputElement) {
      lastLocationNameInput.focus()
    }
  })
}

const removeLocation = (index: number) => {
  userLocations.value = [
    ...userLocations.value.slice(0, index),
    ...userLocations.value.slice(index + 1)
  ]
}

const onSubmit = async () => {
  load.value = true
  try {
    await userLocationStore.updateUserLocations(userLocations.value)
    userLocations.value = userLocationStore.userLocations
  } catch (e) {
    console.log(e)
  }
  load.value = false
}
</script>
