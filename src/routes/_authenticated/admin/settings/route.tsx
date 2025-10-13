import { Settings } from "@/features/admin/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/admin/settings')({
    component: Settings
})