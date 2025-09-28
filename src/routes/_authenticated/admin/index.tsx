import Dashboard from "@/features/admin/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated/admin/')({
    component: Dashboard
})