<script setup lang="ts">
import { TiAppTodoModal } from "@/types";
import { AppModal, AppButton, AppInput } from "@/ui-lib";
import { toRefs } from "vue";

const emit = defineEmits(["close-modal"]);
const props = withDefaults(defineProps<TiAppTodoModal>(), {
  modalState: false,
});
const { modalState } = toRefs(props);
</script>

<template>
  <app-modal :modal-state @click-outside="emit('close-modal')">
    <template #header>
      <app-button
        class="app-todo-modal__close-btn"
        type="icon"
        icon="close"
        @click="emit('close-modal')"
      />
    </template>
    <template #body>
      <div class="app-todo-modal">
        <app-input class="app-todo-modal__input" title="НАЗВАНИЕ" />
        <app-input class="app-todo-modal__input" title="ОПИСАНИЕ" />
        <app-input class="app-todo-modal__input" title="СРОК ВЫПОЛНЕНИЯ" />
        <app-button class="app-todo-modal__btn">сохранить</app-button>
      </div>
    </template>
  </app-modal>
</template>

<style scoped lang="scss">
.app-todo-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  &__input {
    width: 50vw;
    min-width: 255px;
    max-width: 300px;
  }

  &__btn {
    margin-top: 40px;
  }

  &__close-btn {
    margin-left: auto;
  }
}
</style>
