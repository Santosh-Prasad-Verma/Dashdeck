import { create } from "zustand";
import { persist } from "zustand/middleware";

import { users as initialUsers, type UserRow } from "@/app/(main)/dashboard/users/_components/data";

interface UsersState {
  users: UserRow[];
  addUser: (user: UserRow) => void;
  updateUser: (email: string, updates: Partial<UserRow>) => void;
  deleteUser: (email: string) => void;
  resetUsers: () => void;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set) => ({
      users: initialUsers,
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      updateUser: (email, updates) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.email === email ? { ...u, ...updates } : u
          ),
        })),
      deleteUser: (email) =>
        set((state) => ({
          users: state.users.filter((u) => u.email !== email),
        })),
      resetUsers: () =>
        set({ users: initialUsers }),
    }),
    {
      name: "dashdeck-users-storage",
    }
  )
);
