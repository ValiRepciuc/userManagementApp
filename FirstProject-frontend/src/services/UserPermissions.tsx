import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5201";

export const userPermissions = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/permissions/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching permissions for user with id ${id}:`, error);
    throw error;
  }
};

export const postUserPermission = async (
  id: number,
  permissionName: string
) => {
  try {
    const response = await axios.post(`${API_URL}/api/permissions/user/${id}`, {
      permissionName,
    });
    return response.data;
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message || "Failed to add permission";
    toast.error(errorMsg);
    console.error(`Error adding permission for user with id ${id}:`, error);
    throw error;
  }
};

export const deleteUserPermission = async (permissionId: number) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/permissions/${permissionId}`
    );
    toast.success("Permission removed successfully");
    return response.data;
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message || "Failed to remove permission";
    toast.error(errorMsg);
    console.error(`Error removing permission with id ${permissionId}:`, error);
    throw error;
  }
};
