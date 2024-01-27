<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6" @submit="handleSubmit">
    <Divider />
    <div class="grid columns sm:col-2 gap-6 items-baseline">
      <FormInput v-model:value="values.name" label="Nom" id="name" />
      <FormInput
        v-model:value="values.url"
        label="Url de l'annonce"
        id="url"
        rules="required|url"
        type="url"
      />
    </div>

    <div class="grid columns sm:col-2 gap-6 items-baseline">
      <FormInput
        v-model:value="values.price"
        label="Prix"
        id="price"
        rules="required|numeric"
        type="number"
      />
      <FormInput
        v-model:value="values.amount_of_charges"
        label="Montant des charges"
        id="amount_of_charges"
        rules="numeric"
        type="number"
      />
    </div>

    <div class="grid columns sm:col-2 gap-6 items-baseline">
      <FormInput
        v-model:value="values.number_of_rooms"
        label="Nombre de pièces"
        id="number_of_rooms"
        rules="required|numeric"
        type="number"
      />
      <FormInput
        v-model:value="values.surface_area"
        id="surface_area"
        rules="required|numeric"
        type="number"
      >
        <template #label>
          <span
            >Surface
            <span class="text-xs text-contrast-700">(en m<span class="text-lg">²</span>)</span></span
          >
        </template>
      </FormInput>
    </div>

    <div class="grid columns sm:col-2 gap-6 items-baseline">
      <GooglePlacesAutocomplete
        :initialPlace="values.location?.address"
        @place-selected="onSelectPlace"
        rules="required"
      >
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
      <StarRatings :value="values.quality_rating" @update:value="setQualityRating($event)" />
    </div>

    <FormInput v-model:value="values.comment" label="Commentaire" id="comment" :rows="3" />
    <Divider />
    <div class="grid columns col-1 sm:col-2">
      <Button
        :disabled="!meta.valid || !values.location"
        class="order-1"
        type="submit"
        endIcon="arrow-right"
      >
        {{ isUpdate ? 'Modifier la propriété' : 'Créer la propriété' }}
      </Button>
      <div></div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/EasyButton.vue'
import FormInput from '@/components/inputs/FormInput.vue'
import GooglePlacesAutocomplete from '@/components/inputs/GooglePlacesAutocomplete.vue'
import Divider from '@/components/ui/Divider.vue'
import StarRatings from '@/components/ratings/StarRatings.vue'
import { Form } from 'vee-validate'
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import type { Location } from '@/services/location/location.model'
import DateTimePicker from '@/components/inputs/DateTimePicker.vue'
import { convertToNumber } from '@/utils/formats.utils'
import type { Property, PropertyCommand } from '@/services/property/property.model'
import { usePropertyStore } from '@/stores/property.store'

/*STORE*/
const propertyStore = usePropertyStore()

/*PROPS*/
const props = defineProps({
  initialValues: {
    type: Object as PropType<Property>,
    default: () => ({})
  }
})

/*REFS*/
const values = ref({
  name: props.initialValues.name || '',
  url: props.initialValues.url || '',
  price: props.initialValues.price?.toString() || '',
  amount_of_charges: props.initialValues.amount_of_charges?.toString() || '',
  number_of_rooms:
    props.initialValues?.number_of_rooms?.toString() ||
    propertyStore.lastPropertyNumberOfRooms?.toString() ||
    '',
  surface_area: props.initialValues?.surface_area?.toString() || '',
  availability_date: props.initialValues.availability_date || undefined,
  quality_rating: props.initialValues.quality_rating || 0,
  comment: props.initialValues.comment || '',
  location: props.initialValues?.location || (undefined as Location | undefined)
})

/*COMPUTED*/
const isUpdate = computed(() => Object.keys(props.initialValues).length > 0)

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
    surface_area: convertToNumber(values.value.surface_area)
  }
  emit('submit', transformedValues)
}
</script>
