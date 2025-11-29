import { createFileRoute } from "@tanstack/react-router";
import { Settings } from '@/features/talent/settings'

export const Route = createFileRoute('/_authenticated/talent/settings')({
    component: Settings
})