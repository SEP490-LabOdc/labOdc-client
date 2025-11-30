import { Toaster } from "@/components/ui/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { useAuthStore } from '@/stores/auth-store.ts'
import { userKeys } from '@/hooks/api/users'
import { fetchUserById } from '@/hooks/api/users/queries.ts'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
    authStore: typeof useAuthStore
}>()({
  beforeLoad: async ({ context }) => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      const { data } = await context.queryClient.fetchQuery({
        queryKey: userKeys.getUserById(userId),
        queryFn: () => fetchUserById(userId),
      });

      context.authStore.setState({
        user: {
          userId: data.id,
          role: data.role,
          sub: context.authStore.getState().user?.sub || "",
          iat: context.authStore.getState().user?.iat || 0,
          exp: context.authStore.getState().user?.exp || 0,
        }
      });
    }
  },
  component: () => {
        return (
            <>
                <Outlet />
                <Toaster
                    duration={5000}
                    richColors
                />
                {import.meta.env.MODE === 'development' && (
                    <>
                        <ReactQueryDevtools buttonPosition="bottom-left" />
                        <TanStackRouterDevtools position="bottom-right" />
                    </>
                )}
            </>
        )
    },
})