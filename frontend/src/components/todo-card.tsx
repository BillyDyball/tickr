"'use client'";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { TodoItem } from "@/services";

interface TodoCardProps {
  item?: TodoItem;
  onToggleComplete?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function TodoCard({
  item,
  onToggleComplete,
  onDelete,
}: TodoCardProps = {}) {
  if (!item) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleComplete?.(item.id)}
            aria-label={
              item.isComplete ? "Mark as incomplete" : "Mark as complete"
            }
            className="flex-shrink-0"
          >
            {item.isComplete ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400" />
            )}
          </Button>
          <div className="flex-grow text-center">
            <span
              className={`text-lg ${
                item.isComplete ? "'line-through text-gray-500'" : "''"
              }`}
            >
              {item.name}
            </span>
            <span className="block text-xs text-gray-500 mt-1">
              ID: {item.id}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(item.id)}
            aria-label="Delete todo item"
            className="flex-shrink-0"
          >
            <Trash2 className="h-6 w-6 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
