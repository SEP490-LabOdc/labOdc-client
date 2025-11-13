import { createFileRoute } from '@tanstack/react-router'
import { TalentLayout } from '@/features/talent/layout'

export const Route = createFileRoute('/_authenticated/talent')({
  component: TalentLayout,
})
