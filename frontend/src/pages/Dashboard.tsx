import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/context/AuthContext";

import { getMyTeam } from "@/api/team.api";
import { getProjects } from "@/api/project.api";

import CreateTeamForm from "@/components/CreateTeamForm";

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

  if (teamQuery.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome {user?.name}
      </h1>

      {!teamQuery.data?.team?.length ? (
        <CreateTeamForm />
      ) : (
        <>
          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold">
              Team
            </h2>

            <pre>
              {JSON.stringify(
                teamQuery.data.team,
                null,
                2
              )}
            </pre>
          </div>

          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold">
              Projects
            </h2>

            <pre>
              {JSON.stringify(
                projectsQuery.data,
                null,
                2
              )}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;