import React from 'react'

export function Footer() {
    return (
        <footer className="py-12 border-t">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">L</span>
                        </div>
                        <span className="font-bold text-xl">LabODC</span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Contact Support
                        </a>
                    </div>

                    <p className="text-sm text-muted-foreground">© 2024 LabODC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
