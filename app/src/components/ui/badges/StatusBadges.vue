<template>
  <div class="flex items-center gap-2 flex-wrap">
    <AvailableBadge :value="props.available" />
    <ContactedBadge :value="props.contacted" />
  </div>
</template>

<script lang="ts" setup>
import AvailableBadge from '@/components/ui/badges/AvailableBadge.vue'
import ContactedBadge from '@/components/ui/badges/ContactedBadge.vue'

/*PROPS*/
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
</script>
