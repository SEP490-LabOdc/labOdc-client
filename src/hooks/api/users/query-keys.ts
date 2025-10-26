export const userKeys = {
    getUsers: ["users"] as const,
    getUserById: (userId: string | null) => ['user', { userId }] as const,
}