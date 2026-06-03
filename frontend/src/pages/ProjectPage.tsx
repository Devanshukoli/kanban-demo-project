import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTasksByProject } from "@/api/task.api";
import CreateTaskForm from "@/components/CreateTaskForm";
import TaskCard from "@/components/TaskCard";

const ProjectPage = () => {
  const { id } = useParams();

  const tasksQuery = useQuery({
    queryKey: ["tasks", id],
    queryFn: () =>
      getTasksByProject(id!),
  });

  if (tasksQuery.isLoading) {
    return <p>Loading...</p>;
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
    <div className="p-6">
      <CreateTaskForm
        projectId={id!}
      />

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div>
          <h2 className="font-bold text-xl mb-4">
            TODO
          </h2>

          {todoTasks.map(
            (task: any) => (
              <TaskCard
                key={task._id}
                task={task}
                projectId={id!}
              />
            )
          )}
        </div>

        <div>
          <h2 className="font-bold text-xl mb-4">
            IN PROGRESS
          </h2>

          {inProgressTasks.map(
            (task: any) => (
              <TaskCard
                key={task._id}
                task={task}
                projectId={id!}
              />
            )
          )}
        </div>

        <div>
          <h2 className="font-bold text-xl mb-4">
            DONE
          </h2>

          {doneTasks.map(
            (task: any) => (
              <TaskCard
                key={task._id}
                task={task}
                projectId={id!}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;