import { userKeys } from "@/hooks/api/users"
import { fetchUserById } from "@/hooks/api/users/queries"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useUser = () => {
    const userId = localStorage.getItem("user_id")

    const { data: user } = useSuspenseQuery({
        queryKey: userKeys.getUserById(userId),
        queryFn: () => fetchUserById(userId),
        staleTime: Infinity
    })

    return { user: user.data };
}