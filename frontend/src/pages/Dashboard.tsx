import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

import { getMyTeam } from "@/api/team.api";
import { getProjects } from "@/api/project.api";

import CreateTeamForm from "@/components/CreateTeamForm";
import CreateProjectForm from "@/components/CreateProjectForm";
import ProjectList from "@/components/ProjectList";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, logout } =
    useAuth();

  const teamQuery = useQuery({
    queryKey: ["team"],
    queryFn: getMyTeam,
  });

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (
    teamQuery.isLoading ||
    projectsQuery.isLoading
  ) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  const team =
    teamQuery.data?.team ?? [];

  const projects =
    projectsQuery.data?.projects ?? [];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome back, {user?.name}
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage your team,
            projects and tasks
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>

      {/* Team Not Created */}

      {team.length === 0 ? (
        <CreateTeamForm />
      ) : (
        <>
          {/* Top Grid */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* Team Card */}

            <Card>
              <CardHeader>
                <CardTitle>
                  Team Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Team Name
                  </p>

                  <p className="font-medium">
                    {team[0].name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Description
                  </p>

                  <p>
                    {
                      team[0]
                        .description
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}

            <Card>
              <CardHeader>
                <CardTitle>
                  Overview
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>
                    Projects
                  </span>

                  <span className="font-bold">
                    {
                      projects.length
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>
                    Team Members
                  </span>

                  <span className="font-bold">
                    1
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create Project */}

          <CreateProjectForm />

          {/* Projects */}

          <Card>
            <CardHeader>
              <CardTitle>
                Projects
              </CardTitle>
            </CardHeader>

            <CardContent>
              {projects.length === 0 ? (
                <p className="text-muted-foreground">
                  No projects yet.
                  Create your first
                  project.
                </p>
              ) : (
                <ProjectList
                  projects={
                    projects
                  }
                />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;