<template>
  <RouterLink :to="{ name: 'properties', params: { id: props.search.id }}" class="bg-grey-300 grid items-center py-3 px-5 search-card
  b-2 hover:border-primary-light border-transparent cursor-pointer rounded-lg gap-2">
    <h4 class="text-lg text-medium">{{props.search.name}}</h4>

    <div class="flex flex-wrap items-center gap-1" v-if="props.search.location" :title="props.search.location.address">
      <Icon name="map-pin" :width="18" :height="18" fill="var(--yellow)"/>
      <h6 class="text-medium text-sm">{{ props.search.location.city }}</h6>
    </div>

    <div class="flex items-center">
      <div v-for="(user, index) in props.search.users" :key="user.id" style="margin-left: -8px;">
        <Avatar
            :title="index <= maxDisplayUsers - 1 ? user.name : `${props.search.users.length} utilisateurs`"
            class="b-1 border-grey-500"
            :src="index <= maxDisplayUsers - 1 ? user.avatar_url : null"
            size="32px"
            :alt="user.name"
            borderRadius="100%"
            v-if="user && index <= maxDisplayUsers"
        >
          <span v-if="index >= maxDisplayUsers">...</span>
        </Avatar>
      </div>
    </div>

    <Button title="Supprimer la recherche" square small variant="red" startIcon="trash" @click.prevent="deleteSearch"/>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Search } from '@/services/search/search.model'
import Icon from '@/components/common/Icon.vue'
import Button from '@/components/buttons/Button.vue'
import Avatar from '@/components/common/Avatar.vue'

const props = defineProps({
  search: {
    type: Object as PropType<Search>,
    required: true
  }
})

const maxDisplayUsers = 3

const deleteSearch = () => {
  console.log("DELETE")
}
</script>

<style lang="scss" scoped>
.search-card {
  grid-template-columns: 150px 150px 150px auto;
}
</style>
