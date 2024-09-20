import { handleServiceError } from "@/utils";
import { AxiosInstance } from "axios";
import { TodoItem } from "./todo.types";

export class TodoService {
  private http: AxiosInstance;
  private readonly endpoint = "api/TodoItems";

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  getTodos = async (): Promise<TodoItem[]> => {
    try {
      const response = await this.http.get<TodoItem[]>(`${this.endpoint}`);
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "getTodos");
    }
  };

  getTodo = async (id: number): Promise<TodoItem> => {
    try {
      const response = await this.http.get<TodoItem>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "getTodo");
    }
  };

  addTodo = async (todo: TodoItem): Promise<TodoItem> => {
    try {
      const response = await this.http.post<TodoItem>(`${this.endpoint}`, todo);
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "addTodo");
    }
  };

  updateTodo = async (id: number, todo: TodoItem): Promise<void> => {
    try {
      const response = await this.http.put(`${this.endpoint}/${id}`, todo);
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "updateTodo");
    }
  };

  deleteTodo = async (id: number): Promise<void> => {
    try {
      const response = await this.http.delete(`${this.endpoint}/${id}`);
      return response.data;
    } catch (e) {
      throw handleServiceError(e, "deleteTodo");
    }
  };
}
