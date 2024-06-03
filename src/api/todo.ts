import { TiTodo, TiTodoParams } from "@/types";
import httpClient from "./core";

const ENDPOINT = "todo";

const getTodoList = (): Promise<TiTodo[]> =>
  httpClient.get(ENDPOINT).then((res) => res.data);

const createTodo = (params: TiTodoParams): Promise<TiTodo> =>
  httpClient.post(ENDPOINT, params).then((res) => res.data);

const updateTodo = (
  id: TiTodo["id"],
  params: Partial<TiTodoParams>
): Promise<TiTodo> =>
  httpClient.patch(`${ENDPOINT}/${id}`, params).then((res) => res.data);

const deleteTodo = (id: TiTodo["id"]): Promise<TiTodo> =>
  httpClient.delete(`${ENDPOINT}/${id}`).then((res) => res.data);

export default {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodo,
};
