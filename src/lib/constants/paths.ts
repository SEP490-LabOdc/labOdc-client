import { ROUTE_GROUPS } from "./route-groups";

export const errorPaths = {
    unauthorized: ROUTE_GROUPS.errors('/401'),
    notFound: ROUTE_GROUPS.errors('/400'),
} as const