import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthTokens } from '@/hooks/utils/auth-utils.ts'
import { toast } from 'sonner'

export const Route = createFileRoute("/_authenticate")({
  beforeLoad: async () => {
    const { accessToken, refreshToken } = getAuthTokens();
    if(!accessToken && !refreshToken) {
      toast.error('Please sign in to continue.');
      throw redirect({ to: '/sign-in', replace: true } );
    }
  }
})
