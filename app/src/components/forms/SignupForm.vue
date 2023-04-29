<template>
  <Form id="signup-form" v-slot="{meta}" class="d-grid columns col-2 gap-6" @submit="signup">
    <FormInput rules="required" label="Nom et prénom" placeholder="John Doe" id="name"/>
    <FormInput placeholder="Rennes" label="City" id="city"/>
    <FormInput placeholder="email@gmail.com" rules="required|email" label="Email" type="email" id="email"/>
    <FormInput rules="required|min:5" label="Password" type="password" id="password"/>
    <Button :disabled="!meta.valid" type="submit" endIcon="arrow-right" variant="primary">
      Créer mon compte
    </Button>
    <h6 class="text-medium text-sm centered gap-2 flex-wrap">Vous avez déjà un compte ?
      <router-link class="link" to="/login">Se connecter</router-link>
    </h6>
  </Form>
</template>

<script lang="ts" setup>
import { Form, useForm } from 'vee-validate';
import FormInput from '@/components/fields/FormInput.vue'
import Button from '@/components/buttons/Button.vue'
import { Auth } from '@/api/auth/auth';
import { useRouter } from 'vue-router';
import type { SignupCommand } from '@/api/auth/auth.model';

/*HOOKS*/
const router = useRouter();
const { values } = useForm<SignupCommand>();

const signup = async () => {
  const authService = new Auth();
  const { success } = await authService.signup(values);
  if (success) {
    await router.push('/')
  }
};
</script>


<style lang="scss" scoped>
@import "src/assets/style/core/_mixins.scss";

#signup-form {
  @include down(680) {
    grid-template-columns: 1fr;
  }
}
</style>
