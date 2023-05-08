<template>
  <Form v-slot="{meta}" class="flex flex-col gap-6" @submit="handleSubmit">
    <Divider/>
    <div class="grid columns sm:col-2 gap-6">
      <FormInput v-model:value="values.name" label="Nom" id="name"/>
      <FormInput v-model:value="values.url" label="Url de l'annonce" id="url" rules="required|url" type="url" />
    </div>

    <div class="grid columns sm:col-2 gap-6">
      <FormInput v-model:value="values.price" label="Prix" id="price" rules="required|numeric" type="number" />
      <FormInput v-model:value="values.amount_of_charges" label="Montant des charges" id="amount_of_charges" rules="numeric" type="number"/>
    </div>

    <div class="grid columns sm:col-2 gap-6">
      <FormInput v-model:value="values.number_of_rooms" label="Nombre de pièces" id="number_of_rooms" rules="required|numeric" type="number"/>
      <FormInput v-model:value="values.surface_area" id="surface_area" rules="required|numeric" type="number">
        <template #label>
          <span>Surface <span class="text-xs text-contrast-70">(en m<span class="text-lg">²</span>)</span></span>
        </template>
      </FormInput>
    </div>

    <div class="grid columns sm:col-2 gap-6">
      <GooglePlacesAutocomplete @place-selected="onSelectPlace" rules="required">
        <template #label>
          <span>Lieu de la propriété</span>
        </template>
      </GooglePlacesAutocomplete>
      <div class="grid gap-1">
        <label for="date-picker">Date de disponibilité</label>
        <DateTimePicker v-model="values.availability_date" />
      </div>
    </div>


    <div class="grid gap-2">
      <label>Note rapport qualité prix</label>
      <StarRatings
          :value="values.quality_rating"
          @update:value="setQualityRating($event)"
      />
    </div>



    <FormInput v-model:value="values.comment" label="Commentaire" id="comment" :rows="3" />
    <Divider/>
    <div class="grid columns col-1 sm:col-2">
      <Button :disabled="!meta.valid || !values.location" class="order-1" type="submit" endIcon="arrow-right">Créer la propriété</Button>
      <div></div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import Button from "@/components/buttons/Button.vue";
import FormInput from "@/components/fields/FormInput.vue";
import GooglePlacesAutocomplete from '@/components/fields/GooglePlacesAutocomplete.vue'
import Divider from '@/components/common/Divider.vue'
import StarRatings from '@/components/fields/Rating/StarRatings.vue'
import { Form } from 'vee-validate';
import { ref } from 'vue'
import type { Location } from '@/services/location/location.model'
import DateTimePicker from '@/components/fields/DateTimePicker.vue'
import { convertToNumber } from '@/utils/formats'
import type { PropertyCommand } from '@/services/property/property.model'


/*REFS*/
const values = ref({
  name: '',
  url: '',
  price: "",
  amount_of_charges: "",
  number_of_rooms: "",
  surface_area: "",
  availability_date: undefined,
  quality_rating: 0,
  comment: '',
  location: undefined as Location | undefined
})
/*METHODS*/
const onSelectPlace = (place: Location) => {
  values.value.location = place
}

const setQualityRating = (rating: number) => {
  values.value.quality_rating = rating
}

/*Emit*/
const emit = defineEmits(['submit'])
const handleSubmit = async () => {
  const transformedValues: PropertyCommand = {
    ...values.value,
    quality_rating: values.value.quality_rating || undefined,
    amount_of_charges: convertToNumber(values.value.amount_of_charges),
    price: convertToNumber(values.value.price),
    number_of_rooms: convertToNumber(values.value.number_of_rooms),
    surface_area: convertToNumber(values.value.surface_area),
  };
  emit('submit', transformedValues)
};
</script>
