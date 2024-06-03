<script setup lang="ts">
import AppTodoItem from "./AppTodoItem.vue";
import { storeToRefs } from "pinia";
import { useTodoStore } from "@/store";

const todoStore = useTodoStore();

const { todoList } = storeToRefs(todoStore);

const { deleteTodo, updateTodo } = todoStore;
</script>

<template>
  <div class="test2">
    <app-todo-item
      v-for="{ id, title, completed, dueDate } in todoList"
      :key="id"
      :title
      :completed
      :due-date
      :update-completed="() => updateTodo(id, { completed: !completed })"
      :delete-todo="() => deleteTodo(id)"
    />
  </div>
</template>

<style scoped lang="scss">
.test2 {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
