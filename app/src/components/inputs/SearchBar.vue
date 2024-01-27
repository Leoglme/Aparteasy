<template>
  <div class="grid items-center w-full sm:max-w-96 max-w-full grid-cols-[auto,1fr]" :title="props.title">
    <div class="h-full bg-gray-700 flex items-center p-2 rounded-l-md">
      <Icon :width="20" :height="20" name="search" stroke="#f5f4fb" style="margin-bottom: 0" />
    </div>

    <input
      ref="searchInput"
      :value="value"
      class="bg-slate-700 rounded text-neutral-50 border-2 border-transparent focus:border-primary-400 hover:border-contrast-300 py-2 px-4 resize-none transition-border
      duration-100 ease-in w-full outline-none rounded-l-none"
      type="search"
      @input="setRouteSearch"
      placeholder="Rechercher (Ctrl + E)"
    />
  </div>
</template>

<script lang="ts" setup>
import Icon from '@/components/ui/Icon.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouterStore } from '@/stores/router.store'

/*PROPS*/
const props = defineProps({
  title: { type: String, default: null }
})

/*STORE*/
const routerStore = useRouterStore()

/*REFS*/
const value = ref(routerStore.search)

/*METHODS*/
const setRouteSearch = (event: Event) => {
  routerStore.setRouteSearch((event.target as HTMLInputElement).value)
}

/*FOCUS ON CTRL+E*/
const searchInput = ref<HTMLInputElement | null>(null)

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'e') {
    event.preventDefault()
    if (searchInput.value) {
      searchInput.value.focus()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>