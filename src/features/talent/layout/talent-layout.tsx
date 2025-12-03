import Cookies from 'js-cookie'
import { Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import SkipToMain from '@/components/skip-to-main'
import { Search } from '@/components/search.tsx'
import { ThemeSwitch } from '@/components/theme-switch.tsx'
import { ConfigDrawer } from '@/components/config-drawer.tsx'
import { NotificationDropdown } from '@/components/notification-dropdown.tsx'
import { ProfileDropdown } from '@/components/profile-dropdown.tsx'
import { Header } from '@/components/layout/header.tsx'
import { TalentSidebar } from '@/features/talent/layout/talent-sidebar.tsx'
import { Main } from '@/components/layout/main'

interface Props {
  children?: React.ReactNode
}

export function TalentLayout({ children }: Props) {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  return (
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <TalentSidebar />
          <div
            id='content'
            className={cn(
              'ml-auto w-full max-w-full',
              'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
              'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
              'sm:transition-[width] sm:duration-200 sm:ease-linear',
              'flex h-svh flex-col',
              'group-data-[scroll-locked=1]/body:h-full',
              'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
            )}
          >
            <Header fixed>
              <Search />
              <div className='ms-auto flex items-center space-x-4'>
                <ThemeSwitch />
                <ConfigDrawer />
                <NotificationDropdown />
                <ProfileDropdown />
              </div>
            </Header>
            <Main>
              {children ? children : <Outlet />}
            </Main>
          </div>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}
