import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar.tsx'
import SkipToMain from '@/components/skip-to-main.tsx'
import { AppSidebar } from '@/components/layout/app-sidebar.tsx'
import { cn } from '@/lib/utils.ts'
import { Outlet } from '@tanstack/react-router'
import Cookies from 'js-cookie'

interface Props {
  children?: React.ReactNode
}

const CompanyAdminLayout = ({ children }: Props) => {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SkipToMain />
      <AppSidebar />
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
        {children ? children : <Outlet />}
      </div>
    </SidebarProvider>
  )
}

export default CompanyAdminLayout