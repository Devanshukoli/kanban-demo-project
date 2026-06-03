import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type Project = {
  _id: string;
  name: string;
  description: string;
};

type Props = {
  projects: Project[];
};

const ProjectList = ({
  projects,
}: Props) => {
  const navigate =
    useNavigate();

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <Card
          key={project._id}
          className="
            cursor-pointer
            transition-all
            hover:shadow-lg
            hover:-translate-y-1
          "
        >
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">
                📁 {project.name}
              </h3>

              <p className="text-muted-foreground mt-2">
                {project.description}
              </p>
            </div>

            <Button
              onClick={() =>
                navigate(
                  `/project/${project._id}`
                )
              }
              className="w-full"
            >
              Open Project →
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;