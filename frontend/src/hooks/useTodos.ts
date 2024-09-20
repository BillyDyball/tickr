import { TodoItem, todoService } from "@/services";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useTodos = (options?: {
  refetchInterval: number;
}): UseQueryResult<TodoItem[], Error> => {
  const fetchTodos = async () => {
    return await todoService.getTodos();
  };

  return useQuery<TodoItem[], Error>({
    queryKey: ["assets"],
    queryFn: fetchTodos,
    refetchInterval: options?.refetchInterval,
    initialData: [],
  });
};
