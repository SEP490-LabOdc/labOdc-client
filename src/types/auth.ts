export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: 'admin' | 'user';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthStoreState {
    userProfile: UserProfile | null;
    isAuthenticated: boolean;
    token: string | null;

    // Actions
    setUser: (profile: UserProfile, token: string) => void;
    clearUser: () => void;
}