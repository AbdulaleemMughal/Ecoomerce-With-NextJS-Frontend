"use client";

import { UserType } from "@/types/userType";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  users: UserType[];
  totalUsers: number | null;
  limit: number;
  skip: number;
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  setLimit: (n: number) => void;
  setSkip: (n: number) => void;
  getAllUser: () => Promise<void>;
};

const UsersContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const getAllUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/users/search?q=${encodeURIComponent(
          debouncedSearch
        )}&limit=${limit}&skip=${skip}`
      );
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
      }
    }
  }, [limit, skip, debouncedSearch]);

  return (
    <UsersContext.Provider
      value={{
        users,
        getAllUser,
        totalUsers,
        skip,
        setSkip,
        debouncedSearch,
        limit,
        setLimit,
        search,
        setSearch,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error("useUsers must be used within a ProductProvider");
  }
  return ctx;
};
