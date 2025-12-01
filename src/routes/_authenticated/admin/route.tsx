import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getRoleBasePath } from '@/lib/utils.ts'
import { ROLE } from '@/const.ts'

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: ({ context }) => {
    const user = context.authStore.getState().user

    if (!user || user.role !== ROLE.SYSTEM_ADMIN) {
      const redirectPath = user?.role ? getRoleBasePath(user.role) : '/'

      throw redirect({
        to: redirectPath,
      })
    }
  },
  component: AuthenticatedLayout
})
