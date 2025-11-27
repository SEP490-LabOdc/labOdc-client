import { userKeys } from "@/hooks/api/users"
import { fetchUserById } from "@/hooks/api/users/queries"
import { useSuspenseQuery } from "@tanstack/react-query"

export type UserRole = 'SYSTEM_ADMIN' | 'LAB_ADMIN' | 'MENTOR' | 'COMPANY' | 'USER';

export const getRoleBasePath = (role: UserRole): string => {
  const rolePathMap = {
    'SYSTEM_ADMIN': '/admin',
    'LAB_ADMIN': '/lab-admin',
    'MENTOR': '/mentor',
    'COMPANY': '/company',
    'USER': '/user'
  }
  return rolePathMap[role] || '/user'
}

export const useUser = () => {
  const userId = localStorage.getItem("user_id")

  const { data: queryResult } = useSuspenseQuery({
    queryKey: userKeys.getUserById(userId || "default-id"),
    queryFn: () => fetchUserById(userId!),
    staleTime: Infinity,
  })

  return { user: queryResult.data };
}

