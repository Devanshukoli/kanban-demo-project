import api from "./axios";

export const createProject = async (
  data: {
    name: string;
    description: string;
  }
) => {
  const response = await api.post(
    "/projects",
    data
  );

  return response.data;
};

export const getProjects =
  async () => {
    const response =
      await api.get("/projects");

    return response.data;
  };