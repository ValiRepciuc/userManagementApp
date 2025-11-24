import axios from "axios";
import { toast } from "react-toastify";
import { parseApiError } from "../utils/parseApiError";

const API_URL = "https://usermanagementapp-backend.onrender.com";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/${id}`);
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
    const response = await axios.post(`${API_URL}/api/user`, {
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
    const response = await axios.put(`${API_URL}/api/user/${id}`, {
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
    const response = await axios.delete(`${API_URL}/api/user/${id}`);
    toast.success("User deleted successfully");
    return response.data;
  } catch (error) {
    toast.error(parseApiError(error));
  }
};
