export type Company = {
    id: string
    name: string
    logoUrl?: string
    coverUrl?: string
    industry: "IT Services" | "Fintech" | "E-commerce" | "Game" | "AI/ML" | "Other"
    location: string
    rating: number
    reviews: number
    bio: string
    openProjects: number
    collaboratedTalents: number
    isFollowed: boolean
    website?: string
    email?: string
    foundedYear?: number
}