<template>
  <RouterLink
    v-if="props.search"
    :to="{ name: 'properties', params: { searchId: props.search.id } }"
    class="bg-gray-600 sm:grid sm:items-center py-3 px-3 xs:px-5 b-2
    grid-cols-[150px,200px,auto] border-2 hover:border-primary-400
    border-transparent cursor-pointer rounded-lg gap-3 sm:gap-3 w-full flex sm:justify-normal justify-between flex-wrap min-h-[68px] sm:min-h-[auto] flex-col items-start"
  >
    <h4 class="font-medium">{{ props.search.name }}</h4>

    <div class="flex items-center">
      <div v-for="(user, index) in props.search.users" :key="user.id" class="sm:-ml-2">
        <Avatar
          :title="
            index <= maxDisplayUsers - 1 ? user.name : `${props.search.users.length} utilisateurs`
          "
          class="b-1 border-slate-900"
          :src="index <= maxDisplayUsers - 1 ? user.avatar_url : undefined"
          size="32px"
          :alt="user.name"
          borderRadius="100%"
          v-if="user && index <= maxDisplayUsers"
        >
          <span v-if="index >= maxDisplayUsers">...</span>
        </Avatar>
      </div>
    </div>

    <!-- Mobile Button   -->
    <Button
      v-if="isCreator"
      small
      title="Supprimer la recherche"
      variant="red"
      startIcon="trash"
      class="w-full sm:hidden"
      :class="isCreator ? 'ml-0' : ''"
      @click.prevent="deleteSearch"
    >
      Supprimer
    </Button>

    <!-- Desktop Button   -->
    <Button
        v-if="isCreator"
        title="Supprimer la recherche"
        square
        small
        variant="red"
        startIcon="trash"
        class="hidden sm:block"
        :class="isCreator ? 'ml-auto' : ''"
        @click.prevent="deleteSearch"
    />
  </RouterLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Search } from '@/services/search/search.model'
import Button from '@/components/buttons/EasyButton.vue'
import Avatar from '@/components/ui/Avatar.vue'
import { useAuthStore } from '@/stores/auth.store'
import { computed } from 'vue'

/*STORE*/
const authStore = useAuthStore()

/*PROPS*/
const props = defineProps({
  search: {
    type: Object as PropType<Search>,
    required: true
  }
})

/*COMPUTED*/
const isCreator = computed(() => {
  return props.search.creator_id === authStore.user?.id
})

const maxDisplayUsers = 3
/*EMIT*/
const emit = defineEmits(['delete'])

/*METHODS*/
const deleteSearch = () => {
  emit('delete', props.search)
}
</script>