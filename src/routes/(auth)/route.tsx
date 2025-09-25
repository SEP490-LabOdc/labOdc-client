import PublicLayout from '@/components/layout/public-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
  component: PublicLayout,
})
