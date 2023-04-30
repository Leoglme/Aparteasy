<template>
  <div class="flex flex-col gap-1 relative">
    <span class="flex justify-between" v-if="hasLink || label">
       <label class="flex items-center" :for="id" v-if="label">{{ label }} <span v-if="rules && rules.includes('required')" style="margin-left: 5px;" class="text-primary">*</span></label>
      <slot name="link"></slot>
    </span>
    <Field
        :as="rows ? 'textarea' : undefined"
        :rows="rows"
        :rules="rules"
        class="h-full"
        v-model="valueRef"
        :validateOnInput="true"
        v-slot="{meta, field}"
        :name="props.id"
        :placeholder="props.placeholder">
      <input :size="size" class="input w-full" autofocus :style="hasIcon ? 'padding-left: 40px' : null" v-bind="field" :type="typeRef" :id="props.id"
             :placeholder="props.placeholder"
             :class="{error: meta.validated && !meta.valid}">
    </Field>

    <div class="toggle-password" v-if="type === 'password'" @click.prevent="handleTogglePassword">
      <Icon v-if="!togglePassword" title="Afficher le mot de passe" name="eye" fill="var(--contrast-70)"/>
      <Icon v-if="togglePassword" title="Masquer le mot de passe" name="eye-off" fill="var(--contrast-70)"/>
    </div>

    <ErrorMessage class="invalid-feedback text-xs" :name="props.id"/>
    <slot/>
  </div>
</template>


<script lang="ts" setup>
import { ref, watch, useSlots } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import Icon from "@/components/common/Icon.vue"

/*PROPS*/
const props = defineProps({
  type: { type: String, default: 'text' },
  id: { type: String, default: 'field' },
  value: { type: String, default: '' },
  label: { type: String, default: null },
  errorName: { type: String, default: null },
  size: { type: String, default: null },
  rows: { type: Number, default: null },
  rules: { type: String, default: null },
  placeholder: { type: String, default: null }
});


/*REFS*/
const valueRef = ref(props.value)
const togglePassword = ref(false)
const typeRef = ref(props.type)


/*METHODS*/
const handleTogglePassword = () => {
  togglePassword.value = !togglePassword.value
  typeRef.value = togglePassword.value ? 'text' : 'password'
}

/*EMIT*/
const emit = defineEmits(['update:value'])

/*WATCHERS*/
watch(() => valueRef.value, (val) => {
  emit('update:value', val)
});
watch(() => props.value, (val) => {
  valueRef.value = val
});
const slot = useSlots()
const hasIcon = !!slot['default']
const hasLink = !!slot['link']
</script>

<style>
.toggle-password {
  cursor: pointer;
  position: absolute;
  top: 40px;
  right: 12px;
}
.toggle-password svg:hover path {
  fill: var(--contrast-30);
}
</style>
