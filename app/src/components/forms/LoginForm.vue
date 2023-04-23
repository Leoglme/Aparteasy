<template>
  <Form  v-slot="{meta}" class="d-flex column gap-4" @submit="login">
    <FormInput rules="required|email" label="Email" type="email" id="email" />
    <FormInput rules="required|min:5" id="password" label="Password" type="password"/>
    <Button :disabled="!meta.valid" type="submit" variant="primary">Login</Button>
    <GooglePlacesAutocomplete></GooglePlacesAutocomplete>
  </Form>
</template>

<script lang="ts" setup>
import Button from "@/components/buttons/Button.vue";
import FormInput from "@/components/fields/FormInput.vue";
import GooglePlacesAutocomplete from '@/components/fields/GooglePlacesAutocomplete.vue'
import { Auth } from "@/api/auth/auth";
import { Form, useForm } from 'vee-validate';
import { useRouter } from "vue-router";

/*Hooks*/
const router = useRouter()
const { values } = useForm<{ email: string; password: string }>();

const login = async () => {
  const authService = new Auth();
  const { success } = await authService.login(values);
  if(success){
    await router.push('/')
  }
};
</script>
