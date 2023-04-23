<template>
  <div class="separator" :class="{empty: !text}">
    {{ text }}
  </div>
</template>


<script lang="ts" setup>
/*PROPS*/
const props = defineProps({
  text: { type: String, default: null }
});
</script>
