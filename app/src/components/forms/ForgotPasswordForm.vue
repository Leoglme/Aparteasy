<template>
    <Form v-slot="{meta}" class="flex flex-col gap-6" @submit="forgotPassword">
        <FormInput v-model:value="email" rules="required|email" placeholder="email@gmail.com" label="Email" type="email"
                   id="email"/>
        <Button :disabled="!meta.valid"
                :load="buttonLoading"
                type="submit"
                endIcon="arrow-right"
                variant="primary">
            Continuer
        </Button>
    </Form>
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/Button.vue';
import FormInput from '@/components/inputs/FormInput.vue';
import { AuthService } from '@/services/auth/auth';
import { Form } from 'vee-validate';
import { ref } from 'vue'


/*EMITS*/
const emit = defineEmits(['success'])

/*REFS*/
const email = ref('')
const buttonLoading = ref(false)

const forgotPassword = async () => {
    buttonLoading.value = true
    const authService = new AuthService();
    const { success } = await authService.forgotPassword(email.value);
    if (success) {
        emit('success')
    }
    buttonLoading.value = false
};
</script>
