import { beforeEach, describe, expect, it } from "vitest";

import type { UserRow } from "@/app/[locale]/(main)/dashboard/users/_components/data";
import { useUsersStore } from "@/stores/users-store";

const store = useUsersStore;

const makeMockUser = (overrides: Partial<UserRow> = {}): UserRow => ({
  name: "Test User",
  email: `test-${Date.now()}@example.com`,
  role: "Contributor",
  status: "Active",
  team: "Platform",
  workspace: ["Test Workspace"],
  joinedDate: "01 Jan 2025, 10:00 AM",
  lastActive: 0,
  ...overrides,
});

describe("Users Store", () => {
  beforeEach(() => {
    store.getState().resetUsers();
  });

  describe("initial state", () => {
    it("has a non-empty array of users", () => {
      const { users } = store.getState();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });

    it("every user has all required fields", () => {
      const { users } = store.getState();
      for (const user of users) {
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("role");
        expect(user).toHaveProperty("status");
        expect(user).toHaveProperty("team");
        expect(user).toHaveProperty("workspace");
        expect(user).toHaveProperty("joinedDate");
        expect(user).toHaveProperty("lastActive");
      }
    });

    it("all emails are unique", () => {
      const { users } = store.getState();
      const emails = users.map((u) => u.email);
      expect(new Set(emails).size).toBe(emails.length);
    });
  });

  describe("addUser", () => {
    it("appends a new user to the list", () => {
      const user = makeMockUser({ email: "new@example.com" });
      const countBefore = store.getState().users.length;

      store.getState().addUser(user);

      const usersAfter = store.getState().users;
      expect(usersAfter.length).toBe(countBefore + 1);
      expect(usersAfter[usersAfter.length - 1]).toEqual(user);
    });

    it("preserves existing users when adding a new one", () => {
      const firstUser = store.getState().users[0];
      const user = makeMockUser({ email: "extra@example.com" });

      store.getState().addUser(user);

      expect(store.getState().users[0]).toEqual(firstUser);
    });
  });

  describe("updateUser", () => {
    it("updates a user matched by email", () => {
      const targetEmail = store.getState().users[0].email;

      store.getState().updateUser(targetEmail, { name: "Updated Name" });

      const updated = store.getState().users.find((u) => u.email === targetEmail);
      expect(updated?.name).toBe("Updated Name");
    });

    it("preserves fields not included in the update", () => {
      const target = store.getState().users[0];

      store.getState().updateUser(target.email, { role: "Admin" });

      const updated = store.getState().users.find((u) => u.email === target.email);
      expect(updated?.role).toBe("Admin");
      expect(updated?.name).toBe(target.name);
      expect(updated?.team).toBe(target.team);
    });

    it("can update status", () => {
      const target = store.getState().users[0];

      store.getState().updateUser(target.email, { status: "Suspended" });

      const updated = store.getState().users.find((u) => u.email === target.email);
      expect(updated?.status).toBe("Suspended");
    });

    it("does not affect other users", () => {
      const [first, second] = store.getState().users;

      store.getState().updateUser(first.email, { name: "Changed" });

      const secondAfter = store.getState().users.find((u) => u.email === second.email);
      expect(secondAfter?.name).toBe(second.name);
    });
  });

  describe("deleteUser", () => {
    it("removes the user with the given email", () => {
      const target = store.getState().users[0];
      const countBefore = store.getState().users.length;

      store.getState().deleteUser(target.email);

      expect(store.getState().users.length).toBe(countBefore - 1);
      expect(store.getState().users.find((u) => u.email === target.email)).toBeUndefined();
    });

    it("does not remove users with different emails", () => {
      const [first, second] = store.getState().users;

      store.getState().deleteUser(first.email);

      expect(store.getState().users.find((u) => u.email === second.email)).toBeDefined();
    });

    it("is a no-op for an email not in the list", () => {
      const countBefore = store.getState().users.length;

      store.getState().deleteUser("nonexistent@example.com");

      expect(store.getState().users.length).toBe(countBefore);
    });
  });

  describe("resetUsers", () => {
    it("restores the original user list after modifications", () => {
      const initialSnapshot = JSON.stringify(store.getState().users);

      store.getState().addUser(makeMockUser({ email: "temp@example.com" }));
      store.getState().deleteUser(store.getState().users[0].email);

      expect(JSON.stringify(store.getState().users)).not.toBe(initialSnapshot);

      store.getState().resetUsers();

      expect(JSON.stringify(store.getState().users)).toBe(initialSnapshot);
    });
  });
});
