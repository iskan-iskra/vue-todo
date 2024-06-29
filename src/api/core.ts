import axios from "axios";

const baseURL = "https://test-todo-server.vercel.app/api/";

const httpClient = axios.create({
  baseURL,
  timeout: 5000,
});

export default httpClient;
