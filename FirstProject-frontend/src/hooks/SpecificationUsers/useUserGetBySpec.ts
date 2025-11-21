import { useEffect, useState } from "react";
import {
  getUserByNameSpec,
  getUserByAgeSpec,
} from "../../services/SpecificationUsers/UserGetBySpecService"
import type { User } from "../../types/User";


export const useUserByNameSpec = (name: string) => {
  const [specUser, setSpecUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserByNameSpec = async () => {
      try {
        setLoading(true);
        const response = await getUserByNameSpec(name);
        const formattedUser: User = {
          id: response.id,
          name: response.name,
          email: response.email,
          phone: response.phone,
          avatar: response.avatar,
          createdAt: response.createdAt,
          age: response.age,
        };
        setSpecUser(formattedUser);
      } catch (error) {
        console.error("Failed to fetch user by name spec:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserByNameSpec();
  }, [name]);

  return { specUser, loading };
};

export const useUserByAgeSpec = (age: number) => {
  const [specAgeUser, setSpecAgeUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserByAgeSpec = async () => {
      setLoading(true);
      try {
        const response = await getUserByAgeSpec(age);
        const formattedUser: User = {
          id: response.id,
          name: response.name,
          email: response.email,
          phone: response.phone,
          avatar: response.avatar,
          createdAt: response.createdAt,
          age: response.age,
        };
        setSpecAgeUser(formattedUser);
      } catch (error) {
        console.error("Failed to fetch user by age spec:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserByAgeSpec();
  }, [age]);
  return { specAgeUser, loading };
};
