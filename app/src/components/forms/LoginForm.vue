<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6" @submit="login">
    <FormInput
      v-model:value="values.email"
      rules="required|email"
      placeholder="email@gmail.com"
      label="Email"
      type="email"
      id="email"
    />
    <FormInput
      v-model:value="values.password"
      rules="required|min:5"
      id="password"
      label="Mot de passe"
      type="password"
    >
      <template #link>
        <router-link class="link" tabindex="-1" :to="{ name: 'forgotPassword' }"
          >Mot de passe oublié</router-link
        >
      </template>
    </FormInput>
    <Button
      :load="buttonLoading"
      :disabled="!meta.valid"
      type="submit"
      endIcon="arrow-right"
      variant="primary"
    >
      Se connecter
    </Button>
  </Form>
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/Button.vue'
import FormInput from '@/components/inputs/FormInput.vue'
import { AuthService } from '@/services/auth/auth'
import { Form } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

/*Hooks*/
const router = useRouter()
const route = useRoute()

/*REFS*/
const values = ref({
  email: '',
  password: ''
})
const buttonLoading = ref(false)

const login = async () => {
  buttonLoading.value = true
  const authService = new AuthService()
  const { success } = await authService.login(values.value)
  if (success) {
    const to = route.query.redirect?.toString() || '/'
    await router.push(to)
  }
  buttonLoading.value = false
}
</script>
