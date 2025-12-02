import { useCallback } from 'react';
import { useAuthStore } from '@/stores/auth-store.ts'
import { ROLE } from '@/const.ts'

export const usePermission = () => {
  const user = useAuthStore((state) => state.user);

  /**
   * Check if user has a specific role (or one of a list of roles)
   */
  const hasRole = useCallback((...requiredRoles: string[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  }, [user]);

  return {
    user,
    hasRole,
    isSystemAdmin: user?.role === ROLE.SYSTEM_ADMIN,
    isLabAdmin: user?.role === ROLE.LAB_ADMIN,
    isMentor: user?.role === ROLE.MENTOR,
    isCompany: user?.role === ROLE.COMPANY,
  };
};
