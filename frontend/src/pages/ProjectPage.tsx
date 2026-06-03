import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getTasksByProject } from "@/api/task.api";

import CreateTaskForm from "@/components/CreateTaskForm";
import TaskCard from "@/components/TaskCard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProjectPage = () => {
  const { id } = useParams();

  const tasksQuery = useQuery({
    queryKey: ["tasks", id],
    queryFn: () =>
      getTasksByProject(id!),
  });

  if (tasksQuery.isLoading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  const tasks =
    tasksQuery.data?.tasks ?? [];

  const todoTasks =
    tasks.filter(
      (task: any) =>
        task.status === "TODO"
    );

  const inProgressTasks =
    tasks.filter(
      (task: any) =>
        task.status ===
        "IN_PROGRESS"
    );

  const doneTasks =
    tasks.filter(
      (task: any) =>
        task.status === "DONE"
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Project Board
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage and track your tasks
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              TODO
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {todoTasks.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              IN PROGRESS
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {inProgressTasks.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              DONE
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {doneTasks.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Create Task */}

      <CreateTaskForm
        projectId={id!}
      />

      {/* Kanban Board */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* TODO */}

        <Card>
          <CardHeader>
            <CardTitle>
              📝 TODO ({todoTasks.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {todoTasks.length === 0 ? (
              <p className="text-muted-foreground">
                No tasks
              </p>
            ) : (
              todoTasks.map(
                (task: any) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    projectId={id!}
                  />
                )
              )
            )}
          </CardContent>
        </Card>

        {/* IN PROGRESS */}

        <Card>
          <CardHeader>
            <CardTitle>
              🚧 IN PROGRESS (
              {inProgressTasks.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {inProgressTasks.length === 0 ? (
              <p className="text-muted-foreground">
                No tasks
              </p>
            ) : (
              inProgressTasks.map(
                (task: any) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    projectId={id!}
                  />
                )
              )
            )}
          </CardContent>
        </Card>

        {/* DONE */}

        <Card>
          <CardHeader>
            <CardTitle>
              ✅ DONE ({doneTasks.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {doneTasks.length === 0 ? (
              <p className="text-muted-foreground">
                No tasks
              </p>
            ) : (
              doneTasks.map(
                (task: any) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    projectId={id!}
                  />
                )
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectPage;