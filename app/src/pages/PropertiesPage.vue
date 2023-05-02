<template>
  <div>
    <Button v-if="searchStore.isSearchCreator"
            :to="{name: 'inviteSearch'}"
            class="gap-2" start-icon="user-plus">
      Inviter utilisateurs
    </Button>
    <Button :to="{name: 'searches'}"
            class="gap-2" start-icon="user-plus">
      Mes recherches
    </Button>
    <div class="grid columns p-6 col-2 items-center gap-6">
      <div v-for="(property, index) in propertyStore.properties" :key="`property-${index}`" class="h-full">
        <PropertyCard
            :property="property"
            v-if="property"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSearchStore } from '@/stores/search.store'
import Button from '@/components/buttons/Button.vue'
import { usePropertyStore } from "@/stores/property.store";
import PropertyCard from "@/components/cards/PropertyCard.vue";

/*STORE*/
const searchStore = useSearchStore()
const propertyStore = usePropertyStore()
</script>
