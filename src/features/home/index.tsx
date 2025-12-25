import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Quote, Shield, Star, TrendingUp, Zap } from 'lucide-react'
import { HeroSection } from './components/hero-section'
import { FeatureSection } from './components/feature-section'

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <HeroSection />
            {/* Features Section */}
            <FeatureSection />

            {/* ODC Journey */}
            <section id="process" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Seamless 6-Step ODC Journey</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Enterprise Onboarding",
                                description: "Seamless onboarding with your existing infrastructure and development workflows.",
                            },
                            {
                                step: "02",
                                title: "Build & Train Talent Pool",
                                description: "We identify, vet, and train talented developers specifically for your requirements.",
                            },
                            {
                                step: "03",
                                title: "Form ODC Teams",
                                description: "Create your dedicated offshore teams with the right mix of skills and experience.",
                            },
                            {
                                step: "04",
                                title: "Project Management & Tracking",
                                description: "Comprehensive project oversight, progress tracking and milestone management.",
                            },
                            {
                                step: "05",
                                title: "Evaluation & Improvement",
                                description: "Continuous performance evaluation and process optimization.",
                            },
                            {
                                step: "06",
                                title: "Transfer Talent",
                                description: "Seamless talent transfer and knowledge handover for your project continuity.",
                            },
                        ].map((step, index) => (
                            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-primary-foreground font-bold">{step.step}</span>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            Step {step.step}
                                        </Badge>
                                    </div>
                                    <h3 className="font-semibold text-lg">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm">{step.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-balance">Meet Our Expert Talent & Mentors</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Sarah Vance",
                                role: "Lead Software Engineer",
                                image: "/professional-woman-software-engineer-headshot.jpg",
                            },
                            {
                                name: "Marcus Chen",
                                role: "Senior Project Manager",
                                image: "/professional-asian-man-project-manager-headshot.jpg",
                            },
                            {
                                name: "Sophia Rodriguez",
                                role: "UI/UX Design Lead",
                                image: "/professional-latina-woman-designer-headshot.jpg",
                            },
                            {
                                name: "David Kim",
                                role: "DevOps Specialist",
                                image: "/professional-korean-man-devops-engineer-headshot.jpg",
                            },
                        ].map((member, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 space-y-4">
                                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                                        <img
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-primary">{member.name}</h3>
                                        <p className="text-muted-foreground text-sm">{member.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enterprise Advantages */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-balance">Unlocking Unrivaled Enterprise Advantages</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: TrendingUp,
                                title: "Cost Efficiency",
                                description: "Reduce development costs and scale your teams with our cost-effective ODC model.",
                            },
                            {
                                icon: Shield,
                                title: "Quality Assurance",
                                description: "Rigorous quality checking for top deliverables and best practices.",
                            },
                            {
                                icon: Zap,
                                title: "Flexibility & Scalability",
                                description: "Scale your project resources, adapting quickly to market changes.",
                            },
                        ].map((advantage, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardContent className="p-8 space-y-6">
                                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                                        <advantage.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-xl">{advantage.title}</h3>
                                    <p className="text-muted-foreground">{advantage.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-balance">What Our Partners Say</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote:
                                    "The ODC Platform transformed our development cycle. The talent quality is exceptional and the process is seamless.",
                                author: "Sarah J.",
                                role: "VP of Engineering",
                                company: "TechCorp Solutions",
                            },
                            {
                                quote:
                                    "LabODC delivered skills our client needs and delivered. Their professional training ensured our team was productive from day one.",
                                author: "Michael R.",
                                role: "CTO",
                                company: "InnovateTech",
                            },
                            {
                                quote:
                                    "The ODC model provided the flexibility we needed for our budget while delivering exceptional results. It's been a game-changer for our business efficiency.",
                                author: "Jessica L.",
                                role: "Project Manager",
                                company: "Global Enterprises",
                            },
                        ].map((testimonial, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <Quote className="h-8 w-8 text-primary/20" />
                                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-primary font-semibold text-sm">
                                                {testimonial.author
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{testimonial.author}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {testimonial.role}, {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
