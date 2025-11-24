import api from "./api";
import { toast } from "react-toastify";
import { parseApiError } from "../utils/parseApiError";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/api/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

export const postUser = async (
  name: string,
  email: string,
  phone: string,
  avatar: string,
  birthDate: string
) => {
  try {
    const response = await api.post("/api/user", {
      name,
      email,
      phone,
      avatar,
      birthDate,
    });
    toast.success("User created successfully");
    return response.data;
  } catch (error: any) {
    toast.error(parseApiError(error));
  }
};

export const putUser = async (
  id: number,
  name: string,
  email: string,
  phone: string,
  avatar: string,
  birthDate: string
) => {
  try {
    const response = await api.put(`/api/user/${id}`, {
      name,
      email,
      phone,
      avatar,
      birthDate,
    });

    toast.success("User updated successfully");
    return response.data;
  } catch (error) {
    toast.error(parseApiError(error));
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/api/user/${id}`);
    toast.success("User deleted successfully");
    return response.data;
  } catch (error) {
    toast.error(parseApiError(error));
  }
};
