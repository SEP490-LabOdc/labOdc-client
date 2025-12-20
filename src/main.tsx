import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import NProgress from "nprogress";
//Provider
import { DirectionProvider } from './context/direction-provider'
import { FontProvider } from './context/font-provider'
import { ThemeProvider } from './context/theme-provider'
import { SocketProvider } from './context/socket-context'
import { GoogleOAuthProvider } from '@react-oauth/google'
// Generated Routes
import { routeTree } from './routeTree.gen.ts'
import { NotFoundError } from './features/errors/not-found-error'
//Constant
import { GOOGLE_CLIENT_ID } from '@/const.ts'
// Styles
import './styles/index.css'

import "nprogress/nprogress.css";
import { GeneralError } from './features/errors/general-error.tsx';
import { useAuthStore } from '@/stores/auth-store.ts'
import { queryClient } from '@/hooks/api/reactQuery.tsx'
import { Spinner } from './components/ui/spinner.tsx';


// Create a new router instance
NProgress.configure({ showSpinner: false });

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient, authStore: useAuthStore },
  defaultPendingComponent: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-bunker-800">
      <Spinner className="h-10 w-10" />
      <span className="text-white">Đang tải dữ liệu...</span>
    </div>
  ),
  notFoundMode: 'root',
  defaultNotFoundComponent: NotFoundError,
  defaultErrorComponent: GeneralError,
})

router.subscribe("onBeforeLoad", ({ pathChanged }) => {
  if (pathChanged) {
    NProgress.start();
    const timer = setTimeout(() => {
      clearTimeout(timer);
      NProgress.done();
    }, 2000);
  }
});
router.subscribe("onLoad", () => NProgress.done());

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FontProvider>
            <DirectionProvider>
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <SocketProvider>
                  <RouterProvider router={router} />
                </SocketProvider>
              </GoogleOAuthProvider>
            </DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}