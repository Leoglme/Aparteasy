<template>
  <form class="rating">
    <div class="flex">
      <StarRating v-for="nbStar in nbStars" :key="nbStar" :index="nbStar" v-model:current-star="currentStar"/>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import StarRating from '@/components/fields/Rating/StarRating.vue'

const nbStars = ref(5)
const currentStar = ref(0)
</script>
