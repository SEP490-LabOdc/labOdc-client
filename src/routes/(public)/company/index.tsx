import Companies from '@/features/companies'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/company/')({
    component: Companies,
})

