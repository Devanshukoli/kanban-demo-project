import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTeam } from "@/api/team.api";

const CreateTeamForm = () => {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const mutation = useMutation({
    mutationFn: createTeam,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["team"],
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
      className="space-y-4 border p-4 rounded"
    >
      <h2 className="text-xl font-bold">
        Create Team
      </h2>

      <input
        className="border p-2 w-full"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Team Name"
      />

      <input
        className="border p-2 w-full"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        placeholder="Description"
      />

      <button
        className="border px-4 py-2"
        type="submit"
      >
        Create Team
      </button>
    </form>
  );
};

export default CreateTeamForm;