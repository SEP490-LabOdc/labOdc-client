import React from 'react'
import LandingHeader from './landing-header'
import { Outlet } from '@tanstack/react-router'

type PublicLayoutProps = {
    children?: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div>
            <LandingHeader />
            {children ?? <Outlet />}
        </div>
    )
}
