import ComingSoon from '@/components/coming-soon'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/privacy/')({
  component: ComingSoon,
})

