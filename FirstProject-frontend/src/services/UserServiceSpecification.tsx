import axios from "axios";

const API = "http://localhost:5201/api/userSpec/search";

export const getUsersBySpecification = async (params: {
  search?: string;
  filterBy?: string;
  sort?: string;
  exactAge?: number;
}) => {
  const response = await axios.get(API, { params });
  return response.data;
};
