<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6" @submit="resetPassword">
    <FormInput
      v-model:value="password"
      rules="required|min:6"
      label="Mot de passe"
      type="password"
      id="password"
    />
    <FormInput
      v-model:value="password_confirmation"
      rules="required|confirmed:@password"
      label="Confirmation mot de passe"
      type="password"
      id="password_confirmation"
    />
    <Button
      :load="buttonLoading"
      :disabled="!meta.valid"
      type="submit"
      endIcon="arrow-right"
      variant="primary"
    >
      Confirmer
    </Button>
  </Form>
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/EasyButton.vue'
import FormInput from '@/components/inputs/FormInput.vue'
import { AuthService } from '@/services/auth/auth'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/*HOOKS*/
const router = useRouter()
const route = useRoute()

/*REFS*/
const password = ref('')
const password_confirmation = ref('')
const buttonLoading = ref(false)

const resetPassword = async () => {
  buttonLoading.value = true
  const authService = new AuthService()
  const resetPasswordToken = route.query.resetPasswordToken?.toString()
  const { success } = await authService.resetPassword({
    password: password.value,
    token: resetPasswordToken
  })
  if (success) {
    await router.push({ name: 'login' })
  }
  buttonLoading.value = false
}
</script>
