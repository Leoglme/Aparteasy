<template>
  <div class="grid items-center search__bar">
    <div class="h-full bg-grey-200 flex items-center search__bar--prefix p-2">
      <Icon :width="20" :height="20" name="search" stroke="var(--light)" style="margin-bottom: 0;"/>
    </div>

    <input ref="searchInput"
           v-model="valueRef"
           class="input w-full search__bar--input"
           type="search"
           placeholder="Rechercher (Ctrl + E)">
  </div>
</template>


<script lang="ts" setup>
import Icon from '@/components/common/Icon.vue'
import { ref, watch, onMounted, onUnmounted } from "vue";

/*PROPS*/
const props = defineProps({
  value: { type: String, default: '' }
});

/*REFS*/
const valueRef = ref(props.value)

/*EMIT*/
const emit = defineEmits(['update:value'])

/*WATCHERS*/
watch(() => valueRef.value, (val) => {
  emit('update:value', val)
});
watch(() => props.value, (val) => {
  valueRef.value = val
});

/*FOCUS ON CTRL+E*/
const searchInput = ref<HTMLInputElement | null>(null);

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'e') {
    event.preventDefault();
    if (searchInput.value) {
      searchInput.value.focus();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style lang="scss" scoped>
.search__bar--prefix {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.search__bar--input.input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.search__bar {
  max-width: 400px;
  grid-template-columns: auto 1fr;
}
</style>
