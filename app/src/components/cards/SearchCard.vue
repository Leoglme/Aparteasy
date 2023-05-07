<template>
  <RouterLink :to="{ name: 'properties', params: { id: props.search.id }}"
              :class="{'search__card-creator': isCreator}"
              class="bg-grey-300 grid items-center py-3 px-5 search__card
  b-2 hover:border-primary-light border-transparent cursor-pointer rounded-lg gap-2">
    <h4 class="text-medium">{{ props.search.name }}</h4>

    <LocationMarker class="search__card--location" :location="props.search.location"/>

    <div class="flex items-center search__users">
      <div v-for="(user, index) in props.search.users" :key="user.id" style="margin-left: -8px;">
        <Avatar
            :title="index <= maxDisplayUsers - 1 ? user.name : `${props.search.users.length} utilisateurs`"
            class="b-1 border-grey-500"
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

    <Button v-if="isCreator"
            title="Supprimer la recherche"
            square
            small
            variant="red"
            startIcon="trash"
            @click.prevent="deleteSearch"/>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Search } from '@/services/search/search.model'
import Button from '@/components/buttons/Button.vue'
import Avatar from '@/components/common/Avatar.vue'
import { useAuthStore } from '@/stores/auth.store'
import { computed } from 'vue'
import LocationMarker from '@/components/common/LocationMarker.vue'

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

<style lang="scss" scoped>
@import "@/assets/style/core/_mixins.scss";
.search__card:not(.search__card-creator) {
  grid-template-columns: 150px 150px auto;
}

.search__card-creator {
  grid-template-columns: 150px 150px 150px auto;
}

.search__card {
  @include down(600){
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 68px;
  }
  @include down(450){
    justify-content: flex-start;
  }
}
.search__users {
  @include down(450){
    display: none;
  }
}

.search__card--location {
  @include down(450){
    margin: 0 auto;
  }
}
</style>
