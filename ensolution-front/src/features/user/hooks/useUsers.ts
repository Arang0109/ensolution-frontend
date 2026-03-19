import { useState, useEffect } from "react";

import { getUsers } from "@/entities/user/api/userApi";
import type { UserResponse } from "@/entities/user/model";

export const useUsers = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      if (res.status && res.data) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to load users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    refetch: fetchUsers,
  };
};