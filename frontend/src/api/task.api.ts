import api from "./axios";

export const createTask = async (data: {
  title: string;
  description: string;
  priority: string;
  projectId: string;
}) => {
  const response = await api.post(
    "/tasks",
    data
  );

  return response.data;
};

export const getTasksByProject = async (
  projectId: string
) => {
  const response = await api.get(
    `/tasks/project/${projectId}`
  );

  return response.data;
};

export const updateTask = async ({
  taskId,
  data,
}: {
  taskId: string;
  data: any;
}) => {
  const response = await api.patch(
    `/tasks/${taskId}`,
    data
  );

  return response.data;
};

export const deleteTask = async (
  taskId: string
) => {
  const response = await api.delete(
    `/tasks/${taskId}`
  );

  return response.data;
};