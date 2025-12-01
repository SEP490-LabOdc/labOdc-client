import { useAuthStore } from '@/stores/auth-store.ts'
import { ROLE } from '@/const.ts'

export const useIsMentor = (): boolean => {
  const { user } = useAuthStore()
  return user?.role === ROLE.MENTOR
}
