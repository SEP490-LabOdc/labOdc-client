import ComingSoon from "@/components/coming-soon";
import { ROUTES } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(ROUTES.errors.forbidden)({
    component: ComingSoon
})