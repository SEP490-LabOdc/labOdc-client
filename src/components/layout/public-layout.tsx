import React from 'react'
import LandingHeader from './landing-header'
import { Outlet } from '@tanstack/react-router'
import { Footer } from './footer'
import { BreadcrumbNav } from '../breadcrumb'

type PublicLayoutProps = {
    children?: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div>
            <LandingHeader />
            <div className='mx-auto max-w-6xl p-4'>
                <BreadcrumbNav />
            </div>
            {children ?? <Outlet />}
            <Footer />
        </div>
    )
}
