import { useState } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateTask,
  deleteTask,
} from "@/api/task.api";

import EditTaskForm from "./EditTaskForm";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Props = {
  task: any;
  projectId: string;
};

const TaskCard = ({
  task,
  projectId,
}: Props) => {
  const [editing, setEditing] =
    useState(false);

  const queryClient =
    useQueryClient();

  const updateMutation =
    useMutation({
      mutationFn: updateTask,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "tasks",
            projectId,
          ],
        });
      },
    });

  const deleteMutation =
    useMutation({
      mutationFn: deleteTask,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "tasks",
            projectId,
          ],
        });
      },
    });

  if (editing) {
    return (
      <EditTaskForm
        task={task}
        projectId={projectId}
        onClose={() =>
          setEditing(false)
        }
      />
    );
  }

  return (
    <Card>
      <CardContent className="space-y-4">

        <div>
          <h3 className="font-semibold text-lg">
            {task.title}
          </h3>

          <p className="text-sm text-muted-foreground mt-2">
            {task.description}
          </p>
        </div>

        <div>
          <span className="text-xs font-medium">
            Priority:
          </span>{" "}
          <span
            className={
              task.priority === "HIGH"
                ? "text-red-500"
                : task.priority ===
                    "MEDIUM"
                  ? "text-yellow-500"
                  : "text-green-500"
            }
          >
            {task.priority}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setEditing(true)
            }
          >
            Edit
          </Button>

          {task.status !== "TODO" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                updateMutation.mutate({
                  taskId: task._id,
                  data: {
                    status: "TODO",
                  },
                })
              }
            >
              TODO
            </Button>
          )}

          {task.status !==
            "IN_PROGRESS" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                updateMutation.mutate({
                  taskId: task._id,
                  data: {
                    status:
                      "IN_PROGRESS",
                  },
                })
              }
            >
              Progress
            </Button>
          )}

          {task.status !== "DONE" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                updateMutation.mutate({
                  taskId: task._id,
                  data: {
                    status: "DONE",
                  },
                })
              }
            >
              Done
            </Button>
          )}

          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              deleteMutation.mutate(
                task._id
              )
            }
          >
            Delete
          </Button>

        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;