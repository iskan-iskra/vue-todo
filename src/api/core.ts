import axios from "axios";

const baseURL = "https://test-json-server-ten.vercel.app/api/";

const httpClient = axios.create({
  baseURL,
  timeout: 5000,
});

export default httpClient;
