import axios from "axios";
import { TodoService } from "./TodoService/todo.service";
import { SignalRConnection } from "./SignalR/signalR.service";

const http = axios.create({
  baseURL: "https://localhost:7140",
});

const todoService = new TodoService(http);
const signalRService = new SignalRConnection();

export { todoService };
export { signalRService };
export * from "./TodoService";
