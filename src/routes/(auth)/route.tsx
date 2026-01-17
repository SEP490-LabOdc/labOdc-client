import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getRoleBasePath } from '@/lib/utils'

export const Route = createFileRoute('/(auth)')({
  beforeLoad: ({ context }) => {
    const isAuthenticated = context.authStore.getState().isAuthenticated()

    if (isAuthenticated) {
      const user = context.authStore.getState().user
      const redirectPath = user?.role ? getRoleBasePath(user.role) : '/'

      throw redirect({
        to: redirectPath,
      })
    }
  },
  component: () => <Outlet />,
})
