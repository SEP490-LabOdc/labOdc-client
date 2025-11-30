import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { createFileRoute, redirect } from '@tanstack/react-router'
import { ROLE } from '@/const.ts'
import { getRoleBasePath } from '@/lib/utils.ts'

export const Route = createFileRoute('/_authenticated/lab-admin')({
  beforeLoad: ({ context }) => {
    const user = context.authStore.getState().user

    if (!user || user.role !== ROLE.LAB_ADMIN) {
      const redirectPath = user?.role ? getRoleBasePath(user.role) : '/'

      throw redirect({
        to: redirectPath,
      })
    }
  },
  component: AuthenticatedLayout
})