import { useEffect, useState } from "react";
import { getUsersBySpecification } from "../services/UserServiceSpecification";
import type { User } from "../types/User";
import { toast } from "react-toastify";

export const useUserSpecification = (params: {
  search?: string;
  filterBy?: string;
  sort?: string;
  exactAge?: number;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const fetchSpec = async () => {
      setLoading(true);
      try {
        const result = await getUsersBySpecification(params);
        setUsers(result);
      } catch (err) {
        toast.error("Specification fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchSpec();
  }, [
    params.search,
    params.filterBy,
    params.sort,
    params.exactAge,
    refetchTrigger,
  ]);

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  return { users, loading, refetch };
};
