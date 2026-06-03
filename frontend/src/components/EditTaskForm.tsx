import { useState } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateTask } from "@/api/task.api";

type Props = {
  task: any;
  projectId: string;
  onClose: () => void;
};

const EditTaskForm = ({
  task,
  projectId,
  onClose,
}: Props) => {
  const queryClient =
    useQueryClient();

  const [title, setTitle] =
    useState(task.title);

  const [description,
    setDescription] =
    useState(task.description);

  const [priority,
    setPriority] =
    useState(task.priority);

  const mutation = useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
          projectId,
        ],
      });

      onClose();
    },
  });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    mutation.mutate({
      taskId: task._id,
      data: {
        title,
        description,
        priority,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded space-y-4"
    >
      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="border p-2 w-full"
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="border p-2 w-full"
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value
          )
        }
        className="border p-2 w-full"
      >
        <option value="LOW">
          LOW
        </option>

        <option value="MEDIUM">
          MEDIUM
        </option>

        <option value="HIGH">
          HIGH
        </option>
      </select>

      <button
        type="submit"
        className="border px-4 py-2"
      >
        Save
      </button>
    </form>
  );
};

export default EditTaskForm;