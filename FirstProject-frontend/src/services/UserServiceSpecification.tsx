import api from "./api";

export const getUsersBySpecification = async (params: {
  search?: string;
  filterBy?: string;
  sort?: string;
  exactAge?: number;
}) => {
  const response = await api.get("/api/userSpec/search", { params });
  return response.data;
};
