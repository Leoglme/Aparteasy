<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6" @submit="createSearch">
    <Divider />
    <FormInput v-model:value="name" rules="required" label="Nom de la recherche" id="name" />
    <Divider />
    <div class="grid columns col-1 sm:col-2">
      <Button
        :disabled="!meta.valid"
        :load="buttonLoading"
        :class="{ 'btn-create-search': !buttonLoading }"
        class="order-1"
        type="submit"
        endIcon="arrow-right"
      >
        Créer la recherche
      </Button>
      <div></div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/Button.vue'
import FormInput from '@/components/inputs/FormInput.vue'
import Divider from '@/components/ui/Divider.vue'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search.store'

/*REFS*/
const name = ref('')
const buttonLoading = ref(false)
/*METHODS*/
const createSearch = async () => {
  buttonLoading.value = true
  try {
    await useSearchStore().createSearch({ name: name.value })
  } catch (e) {
    console.log(e)
  }
  buttonLoading.value = false
}
</script>

<style scoped>
.btn-create-search {
  justify-content: flex-start;
}
</style>
