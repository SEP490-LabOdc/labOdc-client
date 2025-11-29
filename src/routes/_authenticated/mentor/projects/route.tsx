import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => <Outlet />

export const Route = createFileRoute('/_authenticated/mentor/projects')({
  component: RouteComponent,
  loader: () => {
    return {
      crumb: 'Danh sách dự án'
    }
  }
})


