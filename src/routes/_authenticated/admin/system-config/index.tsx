import { createFileRoute } from '@tanstack/react-router'
import SystemConfigPage from '@/features/admin/system-config'

export const Route = createFileRoute('/_authenticated/admin/system-config/')({
  component: SystemConfigPage,
})
