<template>
  <div class="bg-grey-300 grid items-center py-3 px-3 xs:px-5 rounded-lg gap-4 w-fit">
    <div class="flex items-center flex-wrap gap-3">
      <h4 class="text-medium">Moyenne</h4>
      <StarRatings disabled :value="averageRatings" />
    </div>

    <div class="flex items-center flex-wrap gap-3">
      <h4 class="text-medium">Rapport qualité prix</h4>
      <StarRatings :value="qualityRating" @update:value="$emit('update:qualityRating', $event)" />
    </div>

    <div class="flex items-center flex-wrap gap-3">
      <h4 class="text-medium">Ma note</h4>
      <StarRatings :value="userRating" @update:value="$emit('update:userRating', $event)" />
    </div>
    <template v-for="(rating, index) in props.ratings" :key="`rating-${index}`">
      <div v-if="rating && !rating.isUser" class="flex items-center flex-wrap gap-3">
        <h4 v-if="rating.user" class="text-medium">{{ rating.user.name }}</h4>
        <StarRatings disabled :value="rating.rating" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Rating } from '@/services/property/property.model'
import type { PropType } from 'vue'
import StarRatings from '@/components/ratings/StarRatings.vue'
import { computed } from 'vue'

/*PROPS*/
const props = defineProps({
  ratings: {
    type: Array as PropType<Rating[]>,
    required: true
  },
  averageRatings: {
    type: Number,
    required: true,
    default: 0
  },
  qualityRating: {
    type: Number,
    required: true,
    default: 0
  }
})

/*COMPUTED*/
const userRating = computed(() => props.ratings.find((rating) => rating.isUser)?.rating ?? 0)
</script>
