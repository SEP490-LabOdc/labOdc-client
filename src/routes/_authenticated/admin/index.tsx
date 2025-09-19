import { ROUTES } from "@/constants";
import Dashboard from "@/features/admin/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(ROUTES.admin.dashboard)({
    component: Dashboard
})