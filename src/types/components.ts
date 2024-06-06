import { TiTodo } from "./todo";

export type TiAppTodoItem = Pick<
  TiTodo,
  "id" | "title" | "description" | "dueDate" | "completed"
> & {
  updateCompleted: () => Promise<void>;
  deleteTodo: () => Promise<void>;
};

export type TiAppTodoModal = {
  modalData?: Pick<TiTodo, "id" | "title" | "description" | "dueDate">;
};
