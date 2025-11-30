import { PublicLayout } from '@/components/layout/public-layout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ context }) => {
    const isAuthenticated = context.authStore.getState().isAuthenticated()

    if (isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: PublicLayout,
})
