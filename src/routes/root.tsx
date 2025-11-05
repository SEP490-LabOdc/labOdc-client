import { Toaster } from "@/components/ui/sonner";
import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useAuthStore } from "@/stores/auth-store";
import { userKeys } from "@/hooks/api/users";
import { fetchUserById } from "@/hooks/api/users/queries";

type TRouterContext = {
  queryClient: QueryClient;
  serverConfig: null | unknown;
  authStore: typeof useAuthStore
};

const RootPage = () => {
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
}

export const Route = createRootRouteWithContext<TRouterContext>()({
  beforeLoad: async ({ context }) => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      const { data } = await context.queryClient.fetchQuery({
        queryKey: userKeys.getUserById(userId),
        queryFn: () => fetchUserById(userId),
      });

      context.authStore.getState().auth.setUser({
        userId: data.id,
        role: data.role,
        sub: "",
        iat: 0,
        exp: 0,
      });
    }
  },
  component: RootPage,
});


