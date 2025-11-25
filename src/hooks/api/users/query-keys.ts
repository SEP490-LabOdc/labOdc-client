export const userKeys = {
    getUsers: ["users"] as const,
    getUserById: (userId: string | null) => ['user', { userId }] as const,
    availableMentors: (projectId: string | null) => [
        "project-members",
        "available-mentors",
        projectId
    ],
    mySubmittedCv: ['my-submitted-cv'] as const,
}