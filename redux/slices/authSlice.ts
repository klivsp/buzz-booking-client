import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  pendingApproval: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  pendingApproval: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearCredentials(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.pendingApproval = false;
    },
    hydrateFromStorage(
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken: string | null;
      }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.pendingApproval = false; // Assume not pending on hydrate
    },
    setPendingApproval(state, action: PayloadAction<boolean>) {
      state.pendingApproval = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, hydrateFromStorage, setPendingApproval } =
  authSlice.actions;
export default authSlice.reducer;
