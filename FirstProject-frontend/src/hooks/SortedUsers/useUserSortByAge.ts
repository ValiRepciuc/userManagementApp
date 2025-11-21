import { useEffect, useState } from "react";
import {
  getAllUsersOrderByAge,
  getAllUsersOrderDescByAge,
} from "../../services/SortedUsers/UserGetSortByAge";
import type { User } from "../../types/User";

export const useUsersOrderByAge = () => {
  const [sortAgeUsers, setSortAgeUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersSortedByAge = async () => {
      try {
        const response = await getAllUsersOrderByAge();
        const formattedUsers = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
          age: user.age,
        }));
        setSortAgeUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users sorted by age:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersSortedByAge();
  }, []);

  return { sortAgeUsers, loading };
};

export const useUsersOrderDescByAge = () => {
  const [sortDescAgeUsers, setSortDescAgeUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersSortedByAge = async () => {
      try {
        const response = await getAllUsersOrderDescByAge();
        const formattedUsers = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
          age: user.age,
        }));
        setSortDescAgeUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users sorted by age:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersSortedByAge();
  }, []);

  return { sortDescAgeUsers, loading };
};
