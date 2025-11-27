import { createFileRoute } from "@tanstack/react-router";
import { Settings } from '@/features/mentor/settings'

export const Route = createFileRoute('/_authenticated/lab-admin/settings')({
    component: Settings
})