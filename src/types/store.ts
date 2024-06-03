import { ComputedRef, Ref } from "vue";
import { TiTodo, TiTodoParams } from "./todo";

export interface IUseTodoStore {
  todoList: ComputedRef<TiTodo[]>;
  searchTitle: Ref<TiTodo["title"]>;
  getTodoList(): Promise<void>;
  createTodo(params: TiTodoParams): Promise<void>;
  updateTodo(reqId: TiTodo["id"], params: Partial<TiTodoParams>): Promise<void>;
  deleteTodo(reqId: TiTodo["id"]): Promise<void>;
}
