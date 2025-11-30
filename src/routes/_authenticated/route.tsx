import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    const isAuthenticated = context.authStore.getState().isAuthenticated()

    if (!isAuthenticated) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.pathname + location.search,
        },
      })
    }
  },
  component: () => <Outlet />,
})
