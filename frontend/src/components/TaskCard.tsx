import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTask, deleteTask } from "@/api/task.api";
import { useState } from "react";
import EditTaskForm from "./EditTaskForm";

type Props = {
  task: any;
  projectId: string;
};

const TaskCard = ({ task, projectId }: Props) => {
  const [editing, setEditing] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });

  if (editing) {
    return (
      <EditTaskForm
        task={task}
        projectId={projectId}
        onClose={() => setEditing(false)}
      />
    );
  }

  return (
    <div className="border p-3 rounded mb-2 space-y-2">
      <h3 className="font-semibold">{task.title}</h3>

      <p className="text-sm">{task.description}</p>

      <p className="text-xs">Priority: {task.priority}</p>

      <div className="flex gap-2 flex-wrap ">
        <button className="border px-2 py-1" onClick={() => setEditing(true)}>
          Edit
        </button>

        {task.status !== "TODO" && (
          <button
            className="border px-2 py-1"
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
          </button>
        )}

        {task.status !== "IN_PROGRESS" && (
          <button
            className="border px-2 py-1"
            onClick={() =>
              updateMutation.mutate({
                taskId: task._id,
                data: {
                  status: "IN_PROGRESS",
                },
              })
            }
          >
            Progress
          </button>
        )}

        {task.status !== "DONE" && (
          <button
            className="border px-2 py-1"
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
          </button>
        )}

        <button
          className="border px-2 py-1"
          onClick={() => deleteMutation.mutate(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
