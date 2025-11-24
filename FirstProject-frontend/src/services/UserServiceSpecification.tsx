import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5201";
const API = `${API_URL}/api/userSpec/search`;

export const getUsersBySpecification = async (params: {
  search?: string;
  filterBy?: string;
  sort?: string;
  exactAge?: number;
}) => {
  const response = await axios.get(API, { params });
  return response.data;
};
