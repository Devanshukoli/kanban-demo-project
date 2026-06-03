import { useState } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createTask } from "@/api/task.api";

type Props = {
  projectId: string;
};

const CreateTaskForm = ({
  projectId,
}: Props) => {
  const queryClient =
    useQueryClient();

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const mutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "tasks",
          projectId,
        ],
      });

      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    mutation.mutate({
      title,
      description,
      priority: "MEDIUM",
      projectId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded space-y-4"
    >
      <input
        className="border p-2 w-full"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <button
        type="submit"
        className="border px-4 py-2"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;