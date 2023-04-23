<template>
  <Form id="signup-form" v-slot="{meta}" class="d-grid columns col-2 gap-4" @submit="signup">
    <FormInput rules="required|email" label="Email" type="email" id="email"/>
    <FormInput rules="required" label="Full name" id="name"/>
    <FormInput label="City" id="city"/>
    <FormInput rules="required|min:5" label="Password" type="password" id="password"/>
    <span class="d-flex end-y">
          <span class="h6">Already have an account ? <router-link class="link ml-1"
                                                                  to="/login">Sign in</router-link></span>
        </span>

    <Button :disabled="!meta.valid" class="between" type="submit" endIcon="arrow-right" variant="primary">Create my account</Button>
  </Form>
</template>

<script lang="ts" setup>
import { Form } from "vee-validate";
import FormInput from "@/components/fields/FormInput.vue"
import Button from "@/components/buttons/Button.vue"
import { Auth } from "@/api/auth/auth";
import { useRouter } from "vue-router";
import type { SignupCommand } from "@/api/auth/auth.model";

/*HOOKS*/
const router = useRouter();


const signup = async (values: SignupCommand) => {
  const authService = new Auth();
  const { success } = await authService.signup(values);
  if(success){
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
