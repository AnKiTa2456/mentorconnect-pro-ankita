import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  role: "student" | "mentor";
  bio?: string;
  skills?: string[];
  socialLinks?: Record<string, string>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  pendingRole: "student" | "mentor" | null;
  setUser: (user: User | null) => void;
  setPendingRole: (role: "student" | "mentor" | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      pendingRole: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setPendingRole: (pendingRole) => set({ pendingRole }),
      logout: () => set({ user: null, isAuthenticated: false, pendingRole: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

