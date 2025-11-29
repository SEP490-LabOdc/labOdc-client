import React from 'react'
import { Outlet } from '@tanstack/react-router'
import { Footer } from '@/components/layout/footer.tsx'
import { CompanyHeader } from './company-header'

type CompanyLayoutProps = {
    children?: React.ReactNode
}

export function CompanyLayout({ children }: CompanyLayoutProps) {
    return (
        <div>
            <CompanyHeader />
            {children ?? <Outlet />}
            <Footer />
        </div>
    )
}

