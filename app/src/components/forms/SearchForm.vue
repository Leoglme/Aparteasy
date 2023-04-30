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
    <div class="grid columns col-2">
      <Button :disabled="!meta.valid || !values.location" class="order-1" type="submit" endIcon="arrow-right">Créer la recherche</Button>
      <div></div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import Button from "@/components/buttons/Button.vue";
import FormInput from "@/components/fields/FormInput.vue";
import GooglePlacesAutocomplete from '@/components/fields/GooglePlacesAutocomplete.vue'
import Divider from '@/components/common/Divider.vue'
import { Form } from 'vee-validate';
import { ref } from 'vue'
import type { Location } from '@/services/location/location.model'

/*REFS*/
const values = ref({
  name: '',
  location: null as Location | null
})
/*METHODS*/
const onSelectPlace = (place: Location) => {
  values.value.location = place
}
const createSearch = async () => {
  console.log(values.value)
};
</script>
