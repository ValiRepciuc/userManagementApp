import axios from "axios";

const API_URL = "https://usermanagementapp-backend.onrender.com" || "http://localhost:5201";
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
