import { useState } from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateTask } from "@/api/task.api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

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
    <Card>
      <CardHeader>
        <CardTitle>
          Edit Task
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Title
            </label>

            <Input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-lg
                border
                border-input
                bg-background
                px-3
                py-2
              "
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
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={
                mutation.isPending
              }
            >
              {mutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditTaskForm;