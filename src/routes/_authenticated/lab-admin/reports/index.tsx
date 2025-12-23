import { createFileRoute } from '@tanstack/react-router'
import Reports from '@/features/labAdmin/reports'

export const Route = createFileRoute('/_authenticated/lab-admin/reports/')({
  component: Reports,
})
