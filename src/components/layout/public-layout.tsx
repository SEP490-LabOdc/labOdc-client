import React from 'react'
import LandingHeader from './landing-header'
import { Outlet } from '@tanstack/react-router'
import { Footer } from './footer'

type PublicLayoutProps = {
    children?: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div>
            <LandingHeader />
            {children ?? <Outlet />}
            <Footer />
        </div>
    )
}
