import { useState } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createTeam } from "@/api/team.api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

const CreateTeamForm = () => {
  const queryClient =
    useQueryClient();

  const [name, setName] =
    useState("");

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
    <Card>
      <CardHeader>
        <CardTitle>
          Create Team
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Team Name
            </label>

            <Input
              placeholder="Fast Sale Team"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <Textarea
              placeholder="Describe your team..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending
              ? "Creating..."
              : "Create Team"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTeamForm;