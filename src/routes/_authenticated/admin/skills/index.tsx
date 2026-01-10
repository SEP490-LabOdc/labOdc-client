import Skills from '@/features/labAdmin/skills'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/skills/')({
  component: Skills,
})