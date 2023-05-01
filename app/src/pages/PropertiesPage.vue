<template>
  <div>
    isSearchCreator: {{ searchStore.isSearchCreator }}
    <Button v-if="searchStore.isSearchCreator"
            :to="{name: 'inviteSearch'}"
            class="gap-2" start-icon="user-plus">
      Inviter utilisateurs
    </Button>
    <Button :to="{name: 'searches'}"
            class="gap-2" start-icon="user-plus">
      Mes recherches
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { useSearchStore } from '@/stores/search.store'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/buttons/Button.vue'

/*HOOKS*/
const route = useRoute()
const router = useRouter()
/*STORE*/
const searchStore = useSearchStore()

/*MIDDLEWARES*/
const search = searchStore.findSearchById(Number(route.params.id))
if (!search) {
  router.push({ name: 'searches' })
}
</script>
