import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown, Code, Lightbulb, Monitor, Users } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-32 h-32 bg-brand-dark-teal rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-brand-green-teal rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-brand-warm-yellow rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight text-primary">
                                Bridge Talent to Enterprise Success with{" "}
                                <span className="relative">
                                    Lab-based ODC Platform
                                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full"></div>
                                </span>
                            </h1>
                            <p className="text-xl text-foreground/80 text-pretty leading-relaxed">
                                Connect skilled talents with enterprises through training, mini-ODC teams, and interactive learning.
                                Transform your development capabilities with our comprehensive platform.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="text-lg px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-4 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold transition-all duration-300"
                            >
                                Request Demo
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center space-x-6 pt-4">
                            <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 bg-secondary rounded-full border-2 border-card flex items-center justify-center"
                                        >
                                            <span className="text-secondary-foreground text-xs font-semibold">{i}</span>
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm text-foreground/70">500+ Enterprises Trust Us</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Hero Illustration */}
                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8">
                            {/* Main Illustration Container */}
                            <div className="aspect-square bg-card rounded-2xl shadow-2xl p-6 relative overflow-hidden border border-border">
                                {/* Dashboard Mockup */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Monitor className="h-5 w-5 text-primary" />
                                            <span className="text-sm font-semibold text-primary">ODC Dashboard</span>
                                        </div>
                                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                                    </div>

                                    {/* Team Collaboration Visual */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div
                                                key={i}
                                                className="aspect-square bg-gradient-to-br from-accent/20 to-brand-orange/20 rounded-lg flex items-center justify-center"
                                            >
                                                <Users className="h-4 w-4 text-primary" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Code Environment Visual */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Code className="h-4 w-4 text-secondary" />
                                            <div className="h-2 bg-accent/30 rounded flex-1"></div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Lightbulb className="h-4 w-4 text-brand-orange" />
                                            <div className="h-2 bg-secondary/30 rounded flex-1"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange rounded-full animate-bounce"></div>
                                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent/20 rounded-full"></div>
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary/20 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="h-6 w-6 text-primary" />
            </div>
        </section>
    )
}
