<template>
  <Form v-slot="{meta, errors}" class="flex flex-col gap-6" @submit="emit('submit')">
    <div v-for="(email, index) in props.emails"
         :key="`email-${index}`"
         :class="errors[`email-${index + 1}`] ? 'items-start' : 'items-center'"
         class="flex gap-4 invite__row">
      <FormInput :value="email"
                 @update:value="updateEmail(index, $event)"
                 rules="email"
                 class="flex-1"
                 placeholder="email@gmail.com"
                 @keydown.enter.prevent="meta.valid && hasCompletedEmail ? emit('submit') : null"
                 type="required|email"
                 :id="`email-${index + 1}`"/>
      <Button v-if="showDeleteButtons" :title="`Supprimer l'email n°${index + 1}`" square small variant="red"
              startIcon="trash" @click.prevent="removeEmail(index)"/>
    </div>

    <Button class="gap-2" @click.prevent="addEmail" startIcon="plus" variant="dashed">
      Ajouter Plus
    </Button>

    <Button :load="load" class="gap-2" :disabled="!meta.valid || !hasCompletedEmail" type="submit" startIcon="mail">
      <span>Envoyer Invitation<span v-if="props.emails.length > 1">s</span></span>
    </Button>
  </Form>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { Form } from 'vee-validate';
import Button from '@/components/buttons/Button.vue';
import FormInput from '@/components/fields/FormInput.vue';
import { computed, nextTick } from 'vue'
/*PROPS*/
const props = defineProps({
  emails: {
    type: Array as PropType<string[]>,
    required: true
  },
  load: {
    type: Boolean,
    default: false
  }
})

/*EMIT*/
const emit = defineEmits(['update:emails', 'submit'])

/*COMPUTED*/
const showDeleteButtons = computed(() => props.emails.length > 1)
const hasCompletedEmail = computed(() => props.emails.find(email => email !== ''))


/*METHODS*/
const updateEmail = (index: number, newEmail: string) => {
  emit('update:emails', [
    ...props.emails.slice(0, index),
    newEmail,
    ...props.emails.slice(index + 1)
  ]);
}

const addEmail = () => {
  emit('update:emails', [...props.emails, '']);
  nextTick(() => {
    const lastEmailInput = document.querySelector(`#email-${props.emails.length}`);
    if (lastEmailInput instanceof HTMLInputElement) {
      lastEmailInput.focus();
    }
  });
}

const removeEmail = (index: number) => {
  emit('update:emails', [
    ...props.emails.slice(0, index),
    ...props.emails.slice(index + 1)
  ]);
}
</script>


<style lang="scss" scoped>
@import "@/assets/style/core/_mixins.scss";

.invite__row {
  @include down(350) {
    flex-direction: column;
    .btn {
      width: 100%;
    }
  }
}
</style>
