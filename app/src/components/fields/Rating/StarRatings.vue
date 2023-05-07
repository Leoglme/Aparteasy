<template>
  <form class="rating" :data-animate="animate" @click.stop>
    <div class="flex">
      <StarRating v-for="nbStar in props.nbStars"
                  :uniqueId="uniqueId"
                  :key="nbStar" :index="nbStar"
                  :current-star="props.value"
                  @update:current-star="setValue($event)"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import StarRating from '@/components/fields/Rating/StarRating.vue'
import { ref } from 'vue'

/*PROPS*/
const props = defineProps({
  nbStars: { type: Number, default: 5 },
  value: { type: Number, default: 0 }
})

/*REFS*/
const animate = ref(false);

// Generate a unique ID
const uniqueId = ref(Date.now() + Math.random().toString(36).substr(2, 5));


/*EMITS*/
const emit = defineEmits(['update:value'])

/*METHODS*/
const setValue = (value: number) => {
  animate.value = true
  emit('update:value', value)
}
</script>
