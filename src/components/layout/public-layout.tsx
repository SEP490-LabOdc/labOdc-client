import React from 'react'
import LandingHeader from './landing-header'
import { Outlet } from '@tanstack/react-router'
import { Footer } from './footer'
import { BreadcrumbNav } from '../breadcrumb-nav'

type PublicLayoutProps = {
    children?: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div>
            <LandingHeader />
            <BreadcrumbNav />
            {children ?? <Outlet />}
            <Footer />
        </div>
    )
}
