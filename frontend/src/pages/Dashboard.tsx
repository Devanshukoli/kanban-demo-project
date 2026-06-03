import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/context/AuthContext";

import { getMyTeam } from "@/api/team.api";
import { getProjects } from "@/api/project.api";

import CreateTeamForm from "@/components/CreateTeamForm";
import CreateProjectForm from "@/components/CreateProjectForm";
import ProjectList from "@/components/ProjectList";

const Dashboard = () => {
  const { user } = useAuth();

  const teamQuery = useQuery({
    queryKey: ["team"],
    queryFn: getMyTeam,
  });

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (teamQuery.isLoading || projectsQuery.isLoading) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  const team = teamQuery.data?.team ?? [];
  const projects =
    projectsQuery.data?.projects ?? [];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome {user?.name}
        </h1>

        <p className="text-muted-foreground">
          Manage your team and projects
        </p>
      </div>

      {team.length === 0 ? (
        <CreateTeamForm />
      ) : (
        <>
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Team Information
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Name:</strong>{" "}
                {team[0].name}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {team[0].description}
              </p>
            </div>
          </div>

          <CreateProjectForm />

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Projects
            </h2>

            {projects.length === 0 ? (
              <p className="text-gray-500">
                No projects yet. Create your
                first project.
              </p>
            ) : (
              <ProjectList
                projects={projects}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;