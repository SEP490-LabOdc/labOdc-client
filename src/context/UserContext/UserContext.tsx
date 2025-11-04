// Tạm thời comment để làm trang tĩnh, không gọi API
// import { userKeys } from "@/hooks/api/users"
// import { fetchUserById } from "@/hooks/api/users/queries"
// import { useSuspenseQuery } from "@tanstack/react-query"

export const useUser = () => {
    // const userId = localStorage.getItem("user_id")

    // Tạm thời dùng mock data để xem trang tĩnh, không gọi API
    const mockUser = {
        fullName: "Company Admin",
        email: "admin@company.com",
        avatarUrl: "",
    }

    // Trả về mock data để xem trang tĩnh
    // Khi cần call API, uncomment code bên dưới và comment dòng return mockUser
    return { user: mockUser };

    // Code gọi API (đã comment để làm trang tĩnh):
    // if (!userId) {
    //     return { user: mockUser };
    // }
    // const { data: user } = useSuspenseQuery({
    //     queryKey: userKeys.getUserById(userId),
    //     queryFn: () => fetchUserById(userId),
    //     staleTime: Infinity
    // })
    // return { user: user.data };
}