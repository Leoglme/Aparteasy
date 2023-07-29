<template>
  <Form
    id="signup-form"
    v-slot="{ meta }"
    class="grid columns col-1 gap-6 sm:col-2"
    @submit="signup"
  >
    <FormInput
      v-model:value="values.name"
      rules="required"
      label="Nom et prénom"
      placeholder="John Doe"
      id="name"
    />
    <FormInput
      v-model:value="values.email"
      placeholder="email@gmail.com"
      rules="required|email"
      label="Email"
      type="email"
      id="email"
    />
    <FormInput
      v-model:value="values.password"
      rules="required|min:6"
      label="Mot de passe"
      type="password"
      id="password"
    />
    <FormInput
      v-model:value="values.password_confirmation"
      rules="required|confirmed:@password"
      label="Confirmation mot de passe"
      type="password"
      id="password_confirmation"
    />
    <Button
      :disabled="!meta.valid"
      :load="buttonLoading"
      class="sm:order-1"
      type="submit"
      endIcon="arrow-right"
      variant="primary"
    >
      Créer mon compte
    </Button>
    <h6 class="text-medium text-sm centered sm:justify-start gap-2 flex-wrap">
      Vous avez déjà un compte ?
      <router-link class="link" :to="{ name: 'login', query: $route.query }"
        >Se connecter</router-link
      >
    </h6>
  </Form>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import FormInput from '@/components/inputs/FormInput.vue'
import Button from '@/components/buttons/Button.vue'
import { AuthService } from '@/services/auth/auth'
import { useRoute, useRouter } from 'vue-router'
import type { SignupCommand } from '@/services/auth/auth.model'
import { ref } from 'vue'

/*HOOKS*/
const router = useRouter()
const route = useRoute()
/*REFS*/
const values = ref({
  email: '',
  password: '',
  password_confirmation: '',
  name: ''
} as SignupCommand)
const buttonLoading = ref(false)

const signup = async () => {
  buttonLoading.value = true
  const authService = new AuthService()
  const { success } = await authService.signup(values.value)
  if (success) {
    const to = route.query.redirect?.toString() || '/'
    await router.push(to)
  }
  buttonLoading.value = false
}
</script>

<style lang="scss" scoped>
@import 'src/assets/style/core/_mixins.scss';
</style>
