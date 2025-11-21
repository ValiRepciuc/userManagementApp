import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from "../services/UserService";
import { formatDate, normalizePhone } from "../utils/formatters";
import type { User } from "../types/User";
import axios from "axios";
import { toast } from "react-toastify";
import { parseApiError } from "../utils/parseApiError";

export const useUsersGetAll = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      const formattedUsers = response.map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: normalizePhone(user.phone),
        avatar: user.avatar,
        createdAt: formatDate(user.createdAt),
        age: user.age,
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, refetch: fetchUsers };
};

export const useGetUserById = (id: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await getUserById(id);
        const formattedUser: User = {
          id: response.id,
          name: response.name,
          email: response.email,
          phone: response.phone,
          avatar: response.avatar,
          createdAt: response.createdAt,
          age: response.age,
        };

        setUser(formattedUser);
      } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserById();
  }, [id]);

  return { user, loading };
};

export const useCreateUser = (refetch: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createUser = async (
    name: string,
    email: string,
    phone: string,
    avatarFile: File | null,
    birthDate: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      let uploadedFileName = "";

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const upload = await axios.post(
          "http://localhost:5201/api/user/upload-avatar",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        uploadedFileName = upload.data.fileName;
      }

      const result = await postUser(
        name,
        email,
        phone,
        uploadedFileName,
        birthDate
      );

      await refetch();
      setSuccess(true);
      return result;
    } catch (error: any) {
      console.log("🔥 EROARE COMPLETĂ DE LA BACKEND:", error);
      console.log("🔥 error.response:", error.response);
      console.log("🔥 error.response.data:", error.response?.data);

      toast.error(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, success };
};

export const useUpdateUser = (id: number, refetch: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (
    name: string,
    email: string,
    phone: string,
    avatar: File | null,
    birthDate: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      let avatarFileName = "";

      if (avatar instanceof File) {
        const formData = new FormData();
        formData.append("avatar", avatar);

        const upload = await axios.post(
          "http://localhost:5201/api/user/upload-avatar",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        avatarFileName = upload.data.fileName;
      } else {
        avatarFileName = avatar || "";
      }

      const result = await putUser(
        id,
        name,
        email,
        phone,
        avatarFileName,
        birthDate
      );

      refetch();
      setSuccess(true);
      return result;
    } catch (err) {
      setError("Failed to update user");
      console.error("Failed to update user:", err);
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error, success };
};

export const useDeleteUser = (id: number, refetch: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteUserById = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await deleteUser(id);
      refetch();
      setSuccess(true);
    } catch (err) {
      setError("Failed to delete user");
      console.error("Failed to delete user:", err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteUserById, loading, error, success };
};
