import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthTokens } from '@/hooks/utils/auth-utils.ts'
import { toast } from 'sonner'

export const Route = createFileRoute("/_restrict-login-signup")({
  beforeLoad: async () => {
    const { accessToken, refreshToken } = getAuthTokens();
    if(accessToken && refreshToken) {
      toast.error('You already logined in.');
      throw redirect({ to: '/', replace: true } );
    }
  }
})
