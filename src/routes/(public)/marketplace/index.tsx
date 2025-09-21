import { ROUTES } from "@/constants";
import MarketplacePage from "@/features/marketplace";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(ROUTES.public.marketplace)({
    component: MarketplacePage
})