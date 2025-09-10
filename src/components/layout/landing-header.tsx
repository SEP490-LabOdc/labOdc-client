import React from 'react'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'

export default function LandingHeader() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src="/public/logo.svg" alt="logo" />
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link to="/solutions" className="text-muted-foreground hover:text-primary transition-colors">
                        Solutions
                    </Link>
                    <Link to="/process" className="text-muted-foreground hover:text-primary transition-colors">
                        Process
                    </Link>
                    <Link to="/team" className="text-muted-foreground hover:text-primary transition-colors">
                        Team
                    </Link>
                    <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                        Testimonials
                    </Link>
                    <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                        Contact
                    </Link>
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
