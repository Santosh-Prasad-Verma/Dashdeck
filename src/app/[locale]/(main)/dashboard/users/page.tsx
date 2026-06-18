"use client";

import { useUsersStore } from "@/stores/users-store";

import { Users } from "./_components/users";

export default function Page() {
  const users = useUsersStore((state) => state.users);
  return <Users users={users} />;
}
