import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { ROUTES } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(ROUTES.admin.layout)({
    component: AuthenticatedLayout
})