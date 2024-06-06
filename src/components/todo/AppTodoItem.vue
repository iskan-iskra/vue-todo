<script setup lang="ts">
import { useLoading } from "@/composables";
import { computeOverdue, dateFormatter } from "@/tools";
import { AppButton, AppCheckbox, AppCard } from "@/ui-lib";
import { computed, ref, toRefs } from "vue";
import AppTodoModal from "./AppTodoModal.vue";
import AppModalDelete from "./AppModalDelete.vue";
import { TiAppTodoItem } from "@/types";

const props = defineProps<TiAppTodoItem>();

const { id, title, completed, dueDate, deleteTodo, updateCompleted } =
  toRefs(props);

const isOverdue = computed<boolean>(() =>
  computeOverdue(completed.value, new Date(dueDate.value))
);

const { isLoading, withLoadingDecorator } = useLoading();

const updateTodoWithLoading = computed(() =>
  withLoadingDecorator(updateCompleted.value)
);

const deleteTodoWithLoading = computed(() =>
  withLoadingDecorator(deleteTodo.value)
);

const isModalEdit = ref<boolean>();
const setModalEdit = (flag: boolean) => {
  isModalEdit.value = flag;
};

const isModalDelete = ref<boolean>();
const setModalDelete = (flag: boolean) => {
  isModalDelete.value = flag;
};
</script>

<template>
  <app-card :type="isOverdue ? 'error' : 'default'">
    <div class="app-todo-item">
      <app-checkbox
        :checked="completed"
        :disabled="isLoading"
        @click="updateTodoWithLoading"
      />
      <div class="app-todo-item__info">
        <div class="app-todo-item__title" :class="{ completed }">
          {{ title }}
        </div>
        <div class="app-todo-item__date">
          {{ dateFormatter(new Date(dueDate)) }}
        </div>
      </div>
      <div class="app-todo-item__btn-wrapper">
        <app-button :disabled="isLoading" @click="setModalDelete(true)">
          удалить
        </app-button>
        <app-button :disabled="isLoading" @click="setModalEdit(true)">
          редактировать
        </app-button>
      </div>
    </div>
  </app-card>

  <app-modal-delete
    v-if="isModalDelete"
    @close-modal="setModalDelete(false)"
    @confirm-delete="deleteTodoWithLoading"
  />

  <app-todo-modal
    v-if="isModalEdit"
    :modal-data="{ id, title, description, dueDate }"
    @close-modal="setModalEdit(false)"
  />
</template>

<style scoped lang="scss">
.app-todo-item {
  display: flex;
  gap: 10px;
  align-items: center;

  &__info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 27px;

    &.completed {
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }

  &__date {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
  }

  &__btn-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
