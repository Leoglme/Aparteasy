<template>
  <div class="separator flex items-center w-full" :class="{ empty: !text }">
    {{ props.text }}
  </div>
</template>

<script lang="ts" setup>
/*PROPS*/
const props = defineProps({
  text: { type: String, default: null }
})
</script>


<style lang="scss" scoped>
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 2px solid #222b39;
}

.separator:not(.empty)::before {
  margin-right: 16px;
}

.separator:not(.empty)::after {
  margin-left: 16px;
}
</style>