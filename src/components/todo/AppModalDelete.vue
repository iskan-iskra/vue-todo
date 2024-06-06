<script setup lang="ts">
import { AppModal, AppButton } from "@/ui-lib";

const emit = defineEmits(["close-modal", "confirm-delete"]);
</script>

<template>
  <app-modal @click-outside="emit('close-modal')">
    <template #header>
      <div class="app-modal-delete__title">Удаление записи</div>
    </template>
    <template #body>
      <div class="app-modal-delete__info">
        При удалении записи данные будут утерены
      </div>
    </template>
    <template #footer>
      <div class="app-modal-delete__btn-wrapper">
        <app-button @click="emit('confirm-delete')">удалить</app-button>
        <app-button @click="emit('close-modal')">Отменить</app-button>
      </div>
    </template>
  </app-modal>
</template>

<style scoped lang="scss">
.app-modal-delete {
  &__title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }

  &__info {
    min-width: 250px;
    width: 50vw;
    max-width: 300px;
  }
  &__btn-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }
}
</style>
