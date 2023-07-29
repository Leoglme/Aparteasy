<template>
  <VDatePicker
    color="blue"
    is-dark
    ref="calendar"
    v-model="date"
    :popover="{ visibility: 'click' }"
  >
    <template #default="{ togglePopover, inputValue, inputEvents }">
      <div class="flex date__picker--group">
        <Button class="date__picker--button" @click.prevent="togglePopover">
          <Icon
            :width="20"
            :height="20"
            style="margin-bottom: 0"
            stroke="var(--light)"
            name="calendar"
          />
        </Button>
        <input
          id="date-picker"
          class="input date__picker--input w-full"
          type="text"
          :value="inputValue"
          v-on="inputEvents"
          :placeholder="`01/01/${currentYear}`"
        />
      </div>
    </template>
  </VDatePicker>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import Button from '@/components/buttons/Button.vue'
import Icon from '@/components/ui/Icon.vue'

const calendar = ref(null)
const date = ref(new Date())
const currentYear = ref(date.value.getFullYear())

onBeforeMount(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/core/_mixins.scss';

.date__picker--button {
  border-top-right-radius: 0;

  @include up(400) {
    border-bottom-right-radius: 0;
  }

  @include down(400) {
    border-top-left-radius: 0;
  }
}

.date__picker--input {
  border-bottom-left-radius: 0;

  @include up(400) {
    border-top-left-radius: 0;
  }

  @include down(400) {
    border-bottom-right-radius: 0;
  }
}

.date__picker--group {
  @include down(400) {
    flex-direction: column-reverse;
  }
}
</style>
