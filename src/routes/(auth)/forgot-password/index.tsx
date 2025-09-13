import { createFileRoute } from "@tanstack/react-router";
import ComingSoon from "@/components/coming-soon";
import { ROUTES } from "@/constants";

export const Route = createFileRoute(ROUTES.auth.forgot_password)({
    component: ComingSoon
})