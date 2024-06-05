<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTodoStore } from "@/store";
import { AppTodoList, AppTodoModal } from "@/components";
import { storeToRefs } from "pinia";
import { useLoading } from "@/composables";
import { AppInput, AppButton } from "@/ui-lib";

const todoStore = useTodoStore();

const { isLoading, withLoadingDecorator } = useLoading();

const { searchTitle } = storeToRefs(todoStore);

const { getTodoList } = todoStore;

const getTodoListWithLoading = withLoadingDecorator(getTodoList);

const isModal = ref<boolean>();
const setModal = (flag: boolean) => {
  isModal.value = flag;
};

onMounted(() => {
  getTodoListWithLoading();
});
</script>

<template>
  <header>
    <app-input v-model="searchTitle" class="search" placeholder="ПОИСК" />
    <app-button @click="setModal(true)">добавить задачу</app-button>
  </header>
  <main>
    <app-todo-list v-if="!isLoading" />
  </main>
  <AppTodoModal :modal-state="isModal" @close-modal="setModal(false)" />
</template>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;

  .search {
    width: 50%;
    min-width: 200px;
    max-width: 400px;
  }
}

main {
  margin-top: 18px;
}
</style>
