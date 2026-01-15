import Request from '@/features/labAdmin/requests'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/lab-admin/requests/')({
  component: Request,
})

