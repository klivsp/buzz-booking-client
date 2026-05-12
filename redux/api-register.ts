import { authApi } from "@/redux/services/authApi";

/** Pass to `dispatch(api.util.resetApiState())` on logout for every registered API slice. */
export const apiRegistry = [authApi] as const;
