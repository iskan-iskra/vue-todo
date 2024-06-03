<script setup lang="ts">
import { onMounted } from "vue";
import { useTodoStore } from "@/store";
import { AppTodoList } from "@/components";
import { storeToRefs } from "pinia";
import { useLoading } from "./composables";

const todoStore = useTodoStore();

const { isLoading, withLoadingDecorator } = useLoading();

const { searchTitle } = storeToRefs(todoStore);

const { getTodoList, createTodo } = todoStore;

const getTodoListWithLoading = withLoadingDecorator(getTodoList);

onMounted(() => {
  getTodoListWithLoading();
});
</script>

<template>
  <input type="text" v-model="searchTitle" />
  <button
    @click="
      createTodo({
        title: 'test title',
        description: 'test description',
        dueDate: new Date(new Date().setHours(+10)).toISOString(),
        completed: false,
      })
    "
  >
    createTodo
  </button>
  <span>{{ isLoading }}</span>

  <app-todo-list v-if="!isLoading" />
</template>

<style scoped lang="scss"></style>
