import axios from "axios";
import { TodoService } from "./TodoService/todo.service";
import { CryptoService } from "./CryptoService/crypto.service";

const http = axios.create({
  baseURL: "https://localhost:7140",
});

const todoService = new TodoService(http);
const cryptoService = new CryptoService(http);

export { todoService };
export * from "./TodoService";

export { cryptoService };
export * from "./CryptoService";
