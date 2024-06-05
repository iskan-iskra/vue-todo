export type TiAppTodoItem = {
  title: string;
  completed: boolean;
  dueDate: string;
  updateCompleted: () => Promise<void>;
  deleteTodo: () => Promise<void>;
};

export type TiAppTodoModal = { modalState: boolean };
