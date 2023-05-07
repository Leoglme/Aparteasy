<template>
  <transition name="modal">
    <div v-if="open" class="fixed inset-0 flex items-center justify-center z-50 px-2">
      <div class="bg-grey-500 rounded-lg p-6 max-w-md w-full mx-auto">
        <header class="text-lg text-medium mb-4">
          <slot name="title">Confirmer l'action</slot>
        </header>
        <main class="mb-4">
          <slot name="content">Êtes-vous sûr de vouloir continuer ?</slot>
        </main>
        <footer class="flex items-center justify-end gap-2 flex-wrap modal__footer">
          <Button variant="red" @click="emit('close')">Annuler</Button>
          <Button variant="green" @click="emit('confirm')">Confirmer</Button>
        </footer>
      </div>
    </div>
  </transition>
  <div class="backdrop" v-if="open"></div>
</template>

<script lang="ts" setup>
import Button from '@/components/buttons/Button.vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['confirm', 'close']);

</script>

<style lang="scss" scoped>
@import "@/assets/style/core/_mixins.scss";
.modal__footer {
  @include down(400){
    .btn {
      flex: 1;
    }
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: transform 0.25s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
.backdrop {
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 10;
}
</style>
