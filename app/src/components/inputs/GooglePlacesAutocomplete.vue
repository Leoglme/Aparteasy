<template>
  <div class="flex flex-col gap-1 relative">
    <label class="flex items-center" for="place" v-if="label || hasLabelSlot">
      <span>
        <slot name="label" v-if="hasLabelSlot" />
        <span v-if="!hasLabelSlot">{{ label }}</span
        ><span
          v-if="rules && rules.includes('required')"
          style="margin-left: 5px"
          class="text-primary"
          >*</span
        >
      </span>
    </label>
    <Field
      :rules="rules"
      class="h-full"
      v-model="search"
      :validateOnInput="true"
      v-slot="{ meta, field }"
      :name="props.id"
      :placeholder="props.placeholder"
    >
      <input
        class="input w-full"
        autofocus
        ref="autocompleteInput"
        v-bind="field"
        type="text"
        id="place"
        :placeholder="props.placeholder"
        :class="{ error: meta.validated && !meta.valid }"
      />
    </Field>
    <ErrorMessage class="invalid-feedback text-xs" name="place" />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, onMounted, useSlots } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
/*PROPS*/
const props = defineProps({
  placeholder: { type: String, default: null },
  initialPlace: { type: String, default: null },
  label: { type: String, default: null },
  rules: { type: String, default: null },
  id: { type: String, default: 'lieu' }
})

/*REFS*/
const autocompleteInput = ref<HTMLInputElement | null>(null)
const search = ref<string>(props.initialPlace || '')
const autocomplete = ref<google.maps.places.Autocomplete | null>(null)

/*EMIT*/
const emit = defineEmits(['place-selected', 'input-focus', 'input-blur'])

/*SLOTS*/
const slot = useSlots()
const hasLabelSlot = !!slot['label']

/*METHODS*/
const initAutoComplete = () => {
  if (!autocompleteInput.value) {
    throw new Error("Ref 'autocompleteInput' is not defined.")
  }
  autocomplete.value = new google.maps.places.Autocomplete(autocompleteInput.value, {
    // types: ['geocode'],
  })

  autocomplete.value.addListener('place_changed', () => {
    const place = autocomplete.value!.getPlace()
    const address = place.formatted_address

    // Récupérer la ville, la région et le pays à partir des composants de l'adresse
    let city = ''
    let region = ''
    let country = ''
    place.address_components?.forEach((component) => {
      if (component.types.includes('locality')) {
        city = component.long_name
      }
      if (component.types.includes('administrative_area_level_1')) {
        region = component.long_name
      }
      if (component.types.includes('country')) {
        country = component.long_name
      }
    })

    // Récupérer les coordonnées géographiques (latitude et longitude)
    const lat = place.geometry?.location.lat()
    const lng = place.geometry?.location.lng()

    const result = {
      address,
      city,
      region,
      country,
      lat,
      lng
    }
    if (address) {
      search.value = address
    }
    emit('place-selected', result)
  })
}

/*LIFECYCLE*/
onMounted(() => {
  initAutoComplete()
})
</script>

<style lang="scss">
@import '@/assets/style/core/variables.scss';

.pac-container {
  border-top: 0;
  font-family: $font;
}

.pac-logo::after {
  display: none;
}

.pac-container {
  display: block;
  background-color: var(--grey-500);
}

.pac-icon,
.hdpi .pac-icon {
  background-size: 16px;
  background-image: url('/public/images/map-pin.svg');
  background-position: unset;
  background-repeat: no-repeat;
}

.pac-item {
  padding: 4px;
  color: var(--contrast-70);
  font-size: 12px;
  cursor: pointer;
  border-color: var(--grey-300);

  &:nth-child(1) {
    border-top: 0;
  }

  &:hover,
  &-selected {
    background-color: var(--grey-300);
  }
}

.pac-item-query {
  font-size: 14px;
  padding-right: 3px;
  color: var(--contrast-70);
  margin-right: 4px;
}

.pac-matched {
  font-weight: 600;
  color: var(--light);
}

.pac-item-selected .pac-icon-marker {
  background-position: unset;
}
</style>
