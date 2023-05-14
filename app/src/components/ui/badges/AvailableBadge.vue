<template>
  <Badge :color="infos.color"
         :backgroundColor="infos.backgroundColor">
    {{ infos.title }}
  </Badge>
</template>


<script lang="ts" setup>
import Badge from '@/components/ui/badges/Badge.vue'
/*PROPS*/
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    required: true
  },
})
/*COMPUTED*/
const infos = computed(() => {
  return {
    title: props.value ? 'Disponible' : 'Non disponible',
    color: props.value ? '#00CC7A' : '#BA1225',
    backgroundColor: props.value ? '#CCFFEB' : '#FBD0D5'
  }
})
</script>
