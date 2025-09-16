import PublicLayout from '@/components/layout/public-layout'
import { ROUTES } from '@/constants'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(ROUTES.auth.layout)({
  component: PublicLayout,
})
