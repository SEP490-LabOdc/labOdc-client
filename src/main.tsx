import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
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
import { Lottie } from '@/components/v2/Lottie'
//Constant
import { GOOGLE_CLIENT_ID } from '@/const.ts'
// Styles
import './styles/index.css'

import "nprogress/nprogress.css";
import { GeneralError } from './features/errors/general-error.tsx';


// Create a new router instance
NProgress.configure({ showSpinner: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPendingComponent: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-bunker-800">
      <Lottie isAutoPlay icon="infisical_loading" className="h-32 w-32" />
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