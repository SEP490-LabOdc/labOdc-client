import { createFileRoute } from '@tanstack/react-router'
import { SettingsAppearance } from '@/features/settings/appearance'

export const Route = createFileRoute('/_authenticated/lab-admin/settings/appearance')({
    component: SettingsAppearance,
})
