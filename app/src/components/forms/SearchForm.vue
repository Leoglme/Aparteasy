<template>
  <Form v-slot="{meta}" class="flex flex-col gap-6" @submit="createSearch">
    <Divider/>
    <FormInput v-model:value="values.name" rules="required" label="Nom de la recherche" id="name" />
    <GooglePlacesAutocomplete @place-selected="onSelectPlace" rules="required">
      <template #label>
        <span>Lieu de la recherche <span class="text-xs text-contrast-70">(Lieu de référence pour la distance)</span></span>
      </template>
    </GooglePlacesAutocomplete>
    <Divider/>
    <div class="grid columns col-1 sm:col-2">
      <Button :disabled="!meta.valid || !values.location"
              :load="buttonLoading"
              class="order-1"
              type="submit"
              endIcon="arrow-right">
          Créer la recherche
      </Button>
      <div></div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import Button from "@/components/buttons/Button.vue";
import FormInput from "@/components/inputs/FormInput.vue";
import GooglePlacesAutocomplete from '@/components/inputs/GooglePlacesAutocomplete.vue'
import Divider from '@/components/ui/Divider.vue'
import { Form } from 'vee-validate';
import { ref } from 'vue'
import type { Location } from '@/services/location/location.model'
import { useSearchStore } from '@/stores/search.store'

/*REFS*/
const values = ref({
  name: '',
  location: undefined as Location | undefined
})
const buttonLoading = ref(false)
/*METHODS*/
const onSelectPlace = (place: Location) => {
  values.value.location = place
}
const createSearch = async () => {
  buttonLoading.value = true
  await useSearchStore().createSearch(values.value)
  buttonLoading.value = false
};
</script>
