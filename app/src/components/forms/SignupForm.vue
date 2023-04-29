<template>
  <Form id="signup-form" v-slot="{meta}" class="d-grid columns col-2 gap-6" @submit="signup">
    <FormInput rules="required|email" label="Email" type="email" id="email"/>
    <FormInput rules="required" label="Full name" id="name"/>
    <FormInput label="City" id="city"/>
    <FormInput rules="required|min:5" label="Password" type="password" id="password"/>
    <Button :disabled="!meta.valid" class="between" type="submit" endIcon="arrow-right" variant="primary">Create my
      account
    </Button>
    <span class="d-flex end-y">
          <span class="text-sm">Already have an account ? <router-link class="link ml-1"
                                                                       to="/login">Sign in</router-link></span>
        </span>
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
