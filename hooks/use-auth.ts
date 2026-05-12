"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  clearCredentials,
  hydrateFromStorage,
  setCredentials,
  setPendingApproval,
} from "@/redux/slices/authSlice";
import {
  useLogoutMutation,
  useRefreshTokenMutation,
} from "@/redux/services/authApi";
import { apiRegistry } from "@/redux/api-register";
import {
  clearTokensFromStorage,
  readTokensFromStorage,
  writeTokensToStorage,
} from "@/lib/auth-storage";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((s) => s.auth);
  const pendingApproval = useAppSelector((s) => s.auth.pendingApproval);
  const [loading, setLoading] = useState(true);
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const [logoutMutation] = useLogoutMutation();

  const isAuthenticated = Boolean(tokens.accessToken);

  const checkAuth = useCallback(() => {
    const { accessToken, refreshToken } = readTokensFromStorage();
    dispatch(hydrateFromStorage({ accessToken, refreshToken }));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const onSync = () => checkAuth();
    window.addEventListener("focus", onSync);
    window.addEventListener("storage", onSync);
    return () => {
      window.removeEventListener("focus", onSync);
      window.removeEventListener("storage", onSync);
    };
  }, [checkAuth]);

  const login = useCallback(
    (accessToken: string, refreshToken: string) => {
      writeTokensToStorage(accessToken, refreshToken);
      dispatch(setCredentials({ accessToken, refreshToken }));
      setLoading(false);
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    const refreshToken = readTokensFromStorage().refreshToken;

    if (refreshToken) {
      try {
        await logoutMutation({ refreshToken }).unwrap();
      } catch {
        // proceed anyway
      }
    }

    clearTokensFromStorage();
    dispatch(clearCredentials());
    for (const api of apiRegistry) {
      dispatch(api.util.resetApiState());
    }
    setLoading(false);
  }, [dispatch, logoutMutation]);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    const refreshToken = readTokensFromStorage().refreshToken;
    if (!refreshToken) {
      await logout();
      return false;
    }
    try {
      const next = await refreshTokenMutation({ refreshToken }).unwrap();
      writeTokensToStorage(next.accessToken, next.refreshToken);
      dispatch(
        setCredentials({
          accessToken: next.accessToken,
          refreshToken: next.refreshToken,
        }),
      );
      return true;
    } catch {
      await logout();
      return false;
    }
  }, [dispatch, logout, refreshTokenMutation]);

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    refreshAccessToken,
    pendingApproval,
  };
}
