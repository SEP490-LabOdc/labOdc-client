import { userKeys } from "@/hooks/api/users"
import { fetchUserById } from "@/hooks/api/users/queries"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useUser = () => {
  const userId = localStorage.getItem("user_id")

  const mockUser = {
    fullName: "Company Admin",
    email: "admin@company.com",
    avatarUrl: "",
  }

  const isEnabled = !!userId;

  const { data: queryResult } = useSuspenseQuery({
    queryKey: userKeys.getUserById(userId || "default-id"),
    queryFn: () => fetchUserById(userId!),
    staleTime: Infinity,
  })

  if (!isEnabled) {
    return { user: mockUser };
  }

  return { user: queryResult.data };
}