<template>
    <div ref="mapRef" style="width: 100%; height: 500px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { PropType } from 'vue';

type Coords = {
    lat: number;
    lng: number;
};

/*PROPS*/
const props = defineProps({
    startLocation: {
        type: Object as PropType<Coords>,
        required: true,
    },
    endLocation: {
        type: Object as PropType<Coords | undefined>,
        required: true,
    },
})

const mapRef = ref<HTMLDivElement | null>(null);

onMounted(async () => {
    if (!window.google || !window.google.maps) {
        console.error('Google Maps JavaScript API is not loaded.');
        return;
    }

    const map = new google.maps.Map(mapRef.value as HTMLElement, {
        center: props.startLocation,
        zoom: 12,
    })

    if (!props.endLocation){
        new google.maps.Marker({
            position: props.startLocation,
            map: map
        });
    }


    if (props.endLocation) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        directionsRenderer.setMap(map);

        const request: google.maps.DirectionsRequest = {
            origin: props.startLocation,
            destination: props.endLocation,
            travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                console.error(`Erreur: ${status}`);
            }
        });
    }

});
</script>
