import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5201";

const api = axios.create({
  baseURL,
});

export const getAvatarUrl = (avatar?: string) => {
  if (!avatar) return "";
  return `${baseURL}/avatars/${avatar}`;
};

export default api;
