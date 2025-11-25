import { useEffect, useState } from "react";
import {
  userPermissions,
  postUserPermission,
  deleteUserPermission,
} from "../services/UserPermissions";
import { toast } from "react-toastify";

interface Permission {
  id: number;
  permissionName: string;
  userId: number;
}

export const useUserPermissions = (userId: number) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const response = await userPermissions(userId);
      setPermissions(response);
    } catch (error) {
      console.error(
        `Failed to fetch permissions for user with id ${userId}:`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [userId]);

  return { permissions, loading, refetch: fetchPermissions };
};

export const usePostUserPermission = () => {
  const addPermission = async (userId: number, permission: string) => {
    try {
      const response = await postUserPermission(userId, permission);
      toast.success("Permission added successfully");
      return response;
    } catch (error) {
      console.error(
        `Failed to add permission for user with id ${userId}:`,
        error
      );
      throw error;
    }
  };
  return { addPermission };
};

export const useDeleteUserPermission = () => {
  const removePermission = async (permissionId: number) => {
    try {
      const response = await deleteUserPermission(permissionId);
      return response;
    } catch (error) {
      console.error(
        `Failed to remove permission with id ${permissionId}:`,
        error
      );
      throw error;
    }
  };
  return { removePermission };
};
