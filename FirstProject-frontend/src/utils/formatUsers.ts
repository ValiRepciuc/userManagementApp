import type { User } from "../types/User";
import { formatDate, normalizePhone } from "./formatters";

export const formatUser = (user: User): User => {
  return {
    ...user,
    phone: normalizePhone(user.phone),
    createdAt: formatDate(user.createdAt),
  };
};

export const formatUsers = (users: User[]): User[] => {
  return users.map(formatUser);
};
