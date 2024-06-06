import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { TiTodo, TiTodoParams, IUseTodoStore } from "@/types";
import { todoService } from "@/api";
import { compareStringValue } from "@/tools";

export default defineStore("todo", (): IUseTodoStore => {
  const storeTodoList = ref<TiTodo[]>([]);

  const searchTitle = ref<TiTodo["title"]>("");

  const todoList = computed<TiTodo[]>(() => {
    if (searchTitle.value) {
      return storeTodoList.value.filter((el) =>
        compareStringValue(el.title, searchTitle.value)
      );
    }
    return storeTodoList.value;
  });

  const getTodoList = async (): Promise<void> => {
    try {
      storeTodoList.value = await todoService.getTodoList();
    } catch (error) {
      alert("Ошибка получения списка задач");
      console.error("Failed to fetch todo list:", error);
    }
  };

  const createTodo = async (params: TiTodoParams): Promise<void> => {
    try {
      const newTodo = await todoService.createTodo(params);
      storeTodoList.value.push(newTodo);
    } catch (error) {
      alert("Ошибка создания задачи");
      console.error("Failed to create todo:", error);
    }
  };

  const updateTodo = async (
    reqId: TiTodo["id"],
    params: Partial<TiTodoParams>
  ): Promise<void> => {
    try {
      const updatedTodo = await todoService.updateTodo(reqId, params);
      const index = storeTodoList.value.findIndex((todo) => todo.id === reqId);
      if (index !== -1) {
        storeTodoList.value[index] = updatedTodo;
      } else {
        console.warn("Todo not found for update:", reqId);
      }
    } catch (error) {
      alert("Ошибка обновления задачи");
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (reqId: TiTodo["id"]): Promise<void> => {
    try {
      await todoService.deleteTodo(reqId);
      storeTodoList.value = storeTodoList.value.filter(
        (todo) => todo.id !== reqId
      );
    } catch (error) {
      alert("Ошибка обновления удаления задачи");
      console.error("Failed to delete todo:", error);
    }
  };

  return {
    todoList,
    searchTitle,
    getTodoList,
    createTodo,
    updateTodo,
    deleteTodo,
  };
});
