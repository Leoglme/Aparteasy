<template>
  <Form style="max-width: 800px;" v-slot="{meta}" class="d-flex column start-y center-x gap-4" @submit="update">
    <div class="d-flex wrap gap-4">
      <FormInput rules="required|email" :value="props.user.email" label="Email" type="email" id="email"/>
      <FormInput rules="required" :value="props.user.name" label="Full name" id="name"/>
      <FormInput rules="required" :value="props.user.city" label="City" id="city"/>
    </div>


    <Button :disabled="!meta.valid" class="between" type="submit" variant="primary">Update User</Button>
  </Form>
</template>

<script lang="ts" setup>
import { Form, useForm } from "vee-validate";
import FormInput from "@/components/fields/FormInput.vue"
import Button from "@/components/buttons/Button.vue"
import { defineProps, ref } from "vue";
import type { PropType } from "vue";
import type { User as UserType } from "@/api/user/user.model";
import { User } from "@/api/user/user";
import { useRoute, useRouter } from "vue-router";
import { notify } from "@/plugins/notyf";

/*Hooks*/
const route = useRoute()
const router = useRouter()

/*Ref*/
const id = ref(route.params.id)
/*Props*/
const props = defineProps({
  user: { type: Object as PropType<UserType>, required: true }
})

const { values } = useForm<{ name: string; email: string; city: string }>();

const update = () => {
  const { email, name, city } = values;
  User.update(id.value, { email, name, city }).then(() => {
    router.push("/administration/users")
    notify.success(`The user ${name} has been modified`)
  }).catch(err => {
    notify.error(err.response?.data?.message || "Error user not updated");
  })
};
</script>
