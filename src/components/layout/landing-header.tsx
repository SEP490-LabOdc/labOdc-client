import React from 'react'
import { Button } from '../ui/button'
import { Link, useLocation } from '@tanstack/react-router'
import { landingHeaderData } from './data/landing-header-data'
import { checkIsActive } from '@/lib/utils'

export default function LandingHeader() {
    const href = useLocation({ select: (location) => location.href })

    return (
        <header className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src="/public/logo.svg" alt="logo" />
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    {landingHeaderData.map((item) => (
                        <Link to={item.url} className={`${checkIsActive(href, item) ? 'text-primary' : ''} hover:text-primary transition-colors font-bold`}>
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm">
                        Sign In
                    </Button>
                    <Button size="sm">Get Started</Button>
                </div>
            </div>
        </header>
    )
}
