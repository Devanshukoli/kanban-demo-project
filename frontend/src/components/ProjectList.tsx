import { useNavigate } from "react-router-dom";

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
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project._id}
          className="border p-4 rounded cursor-pointer"
          onClick={() =>
            navigate(
              `/project/${project._id}`
            )
          }
        >
          <h3 className="font-bold">
            {project.name}
          </h3>

          <p>
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;