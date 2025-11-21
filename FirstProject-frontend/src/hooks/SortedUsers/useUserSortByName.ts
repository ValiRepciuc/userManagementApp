import { useEffect, useState } from "react";
import {
  getUsersOrderByName,
  getUsersOrderDescByName,
  getAllUsersOrderByName,
  getAllUsersOrderDescByName,
} from "../../services/SortedUsers/UserGetSortByNameService";
import type { User } from "../../types/User";

export const useUserOrderByNameBySpec = (name: string) => {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersSortedByName = async () => {
      setLoading(true);
      try {
        const response = await getUsersOrderByName(name);
        const formattedUsers = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
          age: user.age,
        }));
        setSortedUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users sorted by name:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersSortedByName();
  }, [name]);
  return { sortedUsers, loading };
};

export const useUserOrderDescByNameBySpec = (name: string) => {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersSortedByName = async () => {
      setLoading(true);
      try {
        const response = await getUsersOrderDescByName(name);
        const formattedUsers = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
          age: user.age,
        }));
        setSortedUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users sorted by name:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersSortedByName();
  }, [name]);
  return { sortedUsers, loading };
};

export const useUserOrderByName = () => {
  const [sortNameUsers, setSortNameUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSortNameUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsersOrderByName();
        const formattedUsers = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
          age: user.age,
        }));
        setSortNameUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users sorted by name:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSortNameUsers();
  }, []);
  return { sortNameUsers, loading };
};

export const useUserOrderDescByName = () => {
  const [sortDescNameUsers, setSortDescNameUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSortNameUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsersOrderDescByName();
        const formattedUsers = response.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          createdAt: user.createdAt,
          age: user.age,
        }));
        setSortDescNameUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users sorted by name:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSortNameUsers();
  }, []);
  return { sortDescNameUsers, loading };
};
