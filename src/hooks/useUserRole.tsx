import { useAuth } from "./useAuth";

export const useUserRole = () => {
  const { isAdmin } = useAuth();
  return { isAdmin };
};