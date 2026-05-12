const ACCESS = "accessToken";
const REFRESH = "refreshToken";

export function readTokensFromStorage(): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null };
  }
  return {
    accessToken: localStorage.getItem(ACCESS),
    refreshToken: localStorage.getItem(REFRESH),
  };
}

export function isLoggedIn(): boolean {
  const { accessToken } = readTokensFromStorage();
  return Boolean(accessToken);
}

export function writeTokensToStorage(
  accessToken: string,
  refreshToken: string,
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS, accessToken);
  localStorage.setItem(REFRESH, refreshToken);
}

export function clearTokensFromStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
}
