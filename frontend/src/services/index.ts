import axios from "axios";
import { TodoService } from "./TodoService/todo.service";

const http = axios.create({
  baseURL: "https://localhost:7140",
});

const todoService = new TodoService(http);

export { todoService };
export * from "./TodoService";
