import { api, ApiError } from "../api/client";
import type { AuthUser } from "./types";

interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authService = {
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      return await api.post<AuthResponse>("/auth/register", { name, email, password });
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError("Registration failed");
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      return await api.post<AuthResponse>("/auth/login", { email, password });
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError("Login failed");
    }
  },

  getMe: async (token: string): Promise<AuthUser> => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new ApiError("Session expired", 401);
    return res.json();
  },
};
