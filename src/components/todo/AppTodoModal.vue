<script setup lang="ts">
import { useTodoStore } from "@/store";
import { dateFormatterForInput } from "@/tools";
import { TiAppTodoModal, TiTodoParams } from "@/types";
import { AppModal, AppButton, AppInput } from "@/ui-lib";
import { computed, onBeforeUnmount, reactive, toRefs } from "vue";

const todoStore = useTodoStore();

const { createTodo, updateTodo } = todoStore;

const emit = defineEmits(["close-modal"]);

const props = withDefaults(defineProps<TiAppTodoModal>(), {});

const { modalData: propsModalData } = toRefs(props);

const modalData = reactive<Partial<TiTodoParams>>({
  title: propsModalData.value?.title,
  description: propsModalData.value?.description,
  dueDate: propsModalData.value?.dueDate
    ? dateFormatterForInput(new Date(propsModalData.value?.dueDate))
    : undefined,
});

const processMode = computed<"edit" | "create">(() =>
  propsModalData.value?.id ? "edit" : "create"
);

const saveBtnTitle = computed<string>(() => {
  switch (processMode.value) {
    case "create":
      return "Создать";
    case "edit":
      return "Сохранить";
  }
});

const saveProcess = async () => {
  try {
    if (modalData.title && modalData.description && modalData.dueDate) {
      await createTodo({
        title: modalData.title,
        description: modalData.description,
        dueDate: new Date(modalData.dueDate).toISOString(),
        completed: false,
      });
      emit("close-modal");
    } else {
      alert("не все поля заполнены");
    }
  } catch (error) {
    console.log(error);
    alert("Ошибка запроса");
  }
};

const editProcess = async () => {
  try {
    if (propsModalData.value?.id) {
      await updateTodo(propsModalData.value?.id, {
        title: modalData.title,
        description: modalData.description,
        dueDate: modalData.dueDate
          ? new Date(modalData.dueDate).toISOString()
          : undefined,
      });
      emit("close-modal");
    } else {
      alert("проблема с id задачи");
    }
  } catch (error) {
    console.log(error);
    alert("Ошибка запроса");
  }
};

const saveBtnAction = () => {
  switch (processMode.value) {
    case "create":
      saveProcess();
      return;
    case "edit":
      editProcess();
      return;
  }
};

onBeforeUnmount(() => {
  for (let key in modalData) {
    modalData[key as keyof Partial<TiTodoParams>] = undefined;
  }
});
</script>

<template>
  <app-modal @click-outside="emit('close-modal')">
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
        <app-input
          v-model="modalData.title"
          class="app-todo-modal__input"
          title="НАЗВАНИЕ"
        />
        <app-input
          v-model="modalData.description"
          class="app-todo-modal__input"
          title="ОПИСАНИЕ"
        />
        <app-input
          v-model="modalData.dueDate"
          type="date"
          class="app-todo-modal__input"
          title="СРОК ВЫПОЛНЕНИЯ"
        />
        <app-button class="app-todo-modal__btn" @click="saveBtnAction">{{
          saveBtnTitle
        }}</app-button>
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
