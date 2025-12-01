import { createFileRoute, redirect } from '@tanstack/react-router'
import { MentorLayout } from '@/features/mentor/layout'
import { ROLE } from '@/const.ts'
import { getRoleBasePath } from '@/lib/utils.ts'

export const Route = createFileRoute('/_authenticated/mentor')({
  beforeLoad: ({ context }) => {
    const user = context.authStore.getState().user

    if (!user || user.role !== ROLE.MENTOR) {
      const redirectPath = user?.role ? getRoleBasePath(user.role) : '/'

      throw redirect({
        to: redirectPath,
      })
    }
  },
  component: MentorLayout,
})
