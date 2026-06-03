import api from "./axios";

export const createTeam = async (data: {
  name: string;
  description: string;
}) => {
  const response = await api.post(
    "/teams",
    data
  );

  return response.data;
};

export const getMyTeam = async () => {
  const response = await api.get(
    "/teams/my-team"
  );

  return response.data;
};