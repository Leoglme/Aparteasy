<template>
  <label class="switch" :style="{ '--switch-color': color }">
    <input type="checkbox" @click="toggleCheckbox" :checked="value" />
    <span class="slider"></span>
  </label>
</template>

<script lang="ts" setup>
/*PROPS*/
const props = defineProps({
  value: { type: Boolean, default: false },
  color: { type: String, default: 'var(--primary)' }
})

/*EMITS*/
const emit = defineEmits(['update:value'])

/*METHODS*/
const toggleCheckbox = () => {
  emit('update:value', !props.value)
}
</script>

<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.25s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--switch-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--switch-color);
}

input:checked + .slider:before {
  transform: translateX(24px);
}
</style>
