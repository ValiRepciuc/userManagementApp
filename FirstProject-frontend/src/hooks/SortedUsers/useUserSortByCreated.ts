import {
  getAllUsersOrderByCreated,
  getAllUsersOrderDescByCreated,
} from "../../services/SortedUsers/UserGetSortByCreated";
import { useEffect, useState } from "react";
import type { User } from "../../types/User";

export const useUserOrderByCreated = () => {
  const [sortDateUsers, setSortDateUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSortCreatedUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsersOrderByCreated();
        const formattedUsers = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
          age: user.age,
        }));
        setSortDateUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users sorted by created date:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSortCreatedUsers();
  }, []);

  return { sortDateUsers, loading };
};

export const useUserOrderDescByCreated = () => {
  const [sortDescDateUsers, setSortDescDateUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSortCreatedUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsersOrderDescByCreated();
        const formattedUsers = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
          age: user.age,
        }));
        setSortDescDateUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users sorted by created date:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSortCreatedUsers();
  }, []);

  return { sortDescDateUsers, loading };
};
