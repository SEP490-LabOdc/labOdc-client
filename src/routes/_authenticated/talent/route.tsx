import { createFileRoute, redirect } from '@tanstack/react-router'
import { TalentLayout } from '@/features/talent/layout'
import { ROLE } from '@/const.ts'
import { getRoleBasePath } from '@/lib/utils.ts'

export const Route = createFileRoute('/_authenticated/talent')({
  beforeLoad: ({ context }) => {
    const user = context.authStore.getState().user

    if (!user || user.role !== ROLE.USER) {
      const redirectPath = user?.role ? getRoleBasePath(user.role) : '/'

      throw redirect({
        to: redirectPath,
      })
    }
  },
  component: TalentLayout,
})
