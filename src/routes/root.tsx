import { Toaster } from "@/components/ui/sonner";
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

type TRouterContext = {
  queryClient: QueryClient;
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
    component: RootPage,
})