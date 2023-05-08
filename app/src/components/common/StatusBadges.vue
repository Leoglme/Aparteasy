<template>
  <div class="flex items-center gap-2 flex-wrap">
    <Badge :color="availableInfos.color"
           :backgroundColor="availableInfos.backgroundColor">
      {{ availableInfos.title }}
    </Badge>
    <Badge :color="contactedInfos.color"
           :backgroundColor="contactedInfos.backgroundColor">
      {{ contactedInfos.title }}
    </Badge>
  </div>
</template>


<script lang="ts" setup>
import Badge from '@/components/common/Badge.vue'
/*PROPS*/
import { computed } from 'vue'

const props = defineProps({
  available: {
    type: Boolean,
    required: true
  },
  contacted: {
    type: Boolean,
    required: true
  }
})
/*COMPUTED*/
const availableInfos = computed(() => {
  return {
    title: props.available ? 'Disponible': 'Non disponible',
    color: props.available ? '#00CC7A' : '#BA1225',
    backgroundColor: props.available ? '#CCFFEB' : '#FBD0D5'
  }
})
const contactedInfos = computed(() => {
  return {
    title: props.contacted ? 'Contacté': 'Non contacté',
    color: props.contacted ? '#00CC7A' : '#BA1225',
    backgroundColor: props.contacted ? '#CCFFEB' : '#FBD0D5'
  }
})

</script>
