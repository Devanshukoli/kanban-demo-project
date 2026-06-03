import { useState } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createProject } from "@/api/project.api";

const CreateProjectForm = () => {
  const queryClient =
    useQueryClient();

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const mutation = useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      setName("");
      setDescription("");
    },
  });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    mutation.mutate({
      name,
      description,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded space-y-4"
    >
      <h2 className="font-bold">
        Create Project
      </h2>

      <input
        className="border p-2 w-full"
        placeholder="Project Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
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
        Create
      </button>
    </form>
  );
};

export default CreateProjectForm;