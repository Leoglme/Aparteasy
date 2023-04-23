<template>
  <div class="google-places-autocomplete">
    <input
        ref="autocompleteInput"
        v-model="search"
        type="text"
        class="autocomplete-input"
        placeholder="Entrez une adresse"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, onMounted } from 'vue';

/*REFS*/
const autocompleteInput = ref<HTMLInputElement | null>(null);
const search = ref<string>('');
const autocomplete = ref<google.maps.places.Autocomplete | null>(null);

/*EMIT*/
const emit = defineEmits(['place-selected', 'input-focus', 'input-blur']);

/*METHODS*/
const initAutoComplete = () => {
  if (!autocompleteInput.value) {
    throw new Error('Ref \'autocompleteInput\' is not defined.');
  }
  autocomplete.value = new google.maps.places.Autocomplete(autocompleteInput.value, {
    types: ['geocode'],
  });

  autocomplete.value.addListener('place_changed', () => {
    const place = autocomplete.value!.getPlace();
    const address = place.formatted_address;

    // Récupérer la ville, la région et le pays à partir des composants de l'adresse
    let city = '';
    let region = '';
    let country = '';
    place.address_components?.forEach((component) => {
      if (component.types.includes('locality')) {
        city = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        region = component.long_name;
      }
      if (component.types.includes('country')) {
        country = component.long_name;
      }
    });

    // Récupérer les coordonnées géographiques (latitude et longitude)
    const lat = place.geometry?.location.lat();
    const lng = place.geometry?.location.lng();

    const result = {
      address,
      city,
      region,
      country,
      lat,
      lng,
    };

    console.log(result)

    emit('place-selected', result);
  });
};

/*LIFECYCLE*/
onMounted(() => {
  initAutoComplete();
});
</script>

<style scoped>
.google-places-autocomplete {
  position: relative;
}

.autocomplete-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 14px;
}
</style>
