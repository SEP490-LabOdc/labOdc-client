import { createFileRoute } from '@tanstack/react-router'
import { MentorLayout } from '@/features/mentor/layout'

export const Route = createFileRoute('/_authenticated/mentor')({
  component: MentorLayout,
})
