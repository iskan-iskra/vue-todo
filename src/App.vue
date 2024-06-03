<script setup lang="ts">
import { onMounted } from "vue";
import { useTodoStore } from "@/store";
import { AppTodoList } from "@/components";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();

const { searchTitle } = storeToRefs(todoStore);

const { getTodoList, createTodo } = todoStore;

onMounted(() => {
  getTodoList();
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

  <app-todo-list />
</template>

<style scoped lang="scss"></style>
