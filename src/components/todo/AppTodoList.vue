<script setup lang="ts">
import AppTodoItem from "./AppTodoItem.vue";
import { storeToRefs } from "pinia";
import { useTodoStore } from "@/store";

const todoStore = useTodoStore();

const { todoList } = storeToRefs(todoStore);

const { deleteTodo, updateTodo } = todoStore;
</script>

<template>
  <div class="app-todo-list">
    <app-todo-item
      v-for="{ id, title, completed, description, dueDate } in todoList"
      :key="id"
      :id
      :title
      :completed
      :due-date
      :description
      :update-completed="() => updateTodo(id, { completed: !completed })"
      :delete-todo="() => deleteTodo(id)"
    />
  </div>
</template>

<style scoped lang="scss">
.app-todo-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
