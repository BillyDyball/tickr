import { useEffect, useState } from "react";
import { TodoCard } from "@/components/todo-card";
import { signalRService, TodoItem, todoService } from "@/services";
import { Checkbox } from "@/components/checkbox";
import { TextInput } from "@/components/text-input";
import { SubmitButton } from "@/components/submit-button";
import { useTodos } from "@/hooks";
import { cloneDeep } from "@/utils";
import { Button } from "./components/ui/button";

const defaultTodoForm = { name: "", isComplete: false };

function App() {
  const [todoForm, setTodoForm] = useState<{
    name: string;
    isComplete: boolean;
  }>(cloneDeep(defaultTodoForm));

  const { data: todos, isLoading, refetch } = useTodos();

  const handleToggleComplete = async (id: number, todo: TodoItem) => {
    await todoService.updateTodo(id, { ...todo, isComplete: !todo.isComplete });
    await refetch();
  };

  const handleDelete = async (id: number) => {
    await todoService.deleteTodo(id);
    await refetch();
  };

  const handleSubmit = async () => {
    const { name, isComplete } = todoForm;
    if (!name) {
      return;
    }

    await todoService.addTodo({ id: -1, name, isComplete });
    setTodoForm(cloneDeep(todoForm));
    await refetch();
  };

  const getTodos = async () => {
    const response = await todoService.getTodos();
    console.log(response);
    await refetch();
  };

  const sendUser = () => {
    signalRService.sendMessage("Cool man Billy", "wow cool dude 123");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2 lg:w-1/4 space-y-4">
        <div className="space-y-4">
          <TextInput
            id="name-field"
            label="name"
            value={todoForm.name}
            onChange={(e) =>
              setTodoForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Checkbox
            id="is-complete-checkbox"
            label="Is Complete"
            checked={todoForm.isComplete}
            onChange={(checked) =>
              setTodoForm((prev) => ({ ...prev, isComplete: checked }))
            }
          />
          <SubmitButton onClick={handleSubmit}>
            <span>Submit</span>
          </SubmitButton>

          <Button onClick={sendUser}>sendUser</Button>
        </div>

        {isLoading ? (
          <div>loading</div>
        ) : todos === undefined ? (
          <div>Failed to load todos :(</div>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              item={todo}
              onToggleComplete={(id) => handleToggleComplete(id, todo)}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
