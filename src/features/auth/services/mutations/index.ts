import { useMutation } from "@tanstack/react-query"
import type { IUserLoginPayload } from "./types";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";
import { login } from '@/features/auth/services/api.ts'

export const useSignIn = () => {
    const navigate = useNavigate()
    const { auth } = useAuthStore()

    return useMutation({
        mutationFn: (payload: IUserLoginPayload) => login(payload),
        onSuccess: async (data) => {
            // Save both tokens to localStorage
            auth.setTokens(data.accessToken, data.refreshToken)
            await navigate({ to: '/' })
        },
        onError: () => {
            toast.error("Đăng nhập thất bại!")
        }
    })
} 