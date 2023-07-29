<template>
  <div ref="mapRef" style="width: 100%; height: 500px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PropType } from 'vue'

type Coords = {
  lat: number
  lng: number
}

type LocationPair = {
  start: Coords
  end: Coords
}

/*PROPS*/
const props = defineProps({
  locations: {
    type: Array as PropType<LocationPair[]>,
    required: true
  }
})

const mapRef = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  if (!window.google || !window.google.maps) {
    console.error('Google Maps JavaScript API is not loaded.')
    return
  }

  const map = new google.maps.Map(mapRef.value as HTMLElement, {
    center: props.locations[0].start,
    zoom: 12
  })

  const directionsService = new google.maps.DirectionsService()

  for (const locationPair of props.locations) {
    if (locationPair.start && locationPair.end) {
      const directionsRenderer = new google.maps.DirectionsRenderer({
        preserveViewport: true
      })

      directionsRenderer.setMap(map)

      const request: google.maps.DirectionsRequest = {
        origin: locationPair.start,
        destination: locationPair.end,
        travelMode: google.maps.TravelMode.DRIVING
      }

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result)
        } else {
          console.error(`Erreur: ${status}`)
        }
      })
    } else {
      new google.maps.Marker({
        position: locationPair.start,
        map: map
      })
    }
  }
})
</script>
