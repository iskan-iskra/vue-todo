<script setup lang="ts">
import { useLoading } from "@/composables";
import { computeOverdue, dateFormatter } from "@/tools";
import { computed, toRefs } from "vue";

const props = defineProps<{
  title: string;
  completed: boolean;
  dueDate: string;
  updateCompleted: () => Promise<void>;
  deleteTodo: () => Promise<void>;
}>();

const { title, completed, dueDate, deleteTodo, updateCompleted } =
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
</script>

<template>
  <div class="test" :class="{ isOverdue: isOverdue }">
    <input
      type="checkbox"
      :checked="completed"
      :value="completed"
      :disabled="isLoading"
      @click="updateTodoWithLoading"
    />
    <div>
      <span>title: </span><span>{{ title }}</span>
    </div>
    <div>
      <span>deadline:</span><span>{{ dateFormatter(new Date(dueDate)) }}</span>
    </div>
    <button @click="deleteTodoWithLoading" :disabled="isLoading">delete</button>
  </div>
</template>

<style scoped lang="scss">
.test {
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
}
.isOverdue {
  background-color: red;
}
</style>
