import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ClipboardList, FileText, GraduationCap, Search, UserCheck, Users2 } from 'lucide-react'

export function FeatureSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-balance text-[#264653]">
                        Why Choose Lab-based ODC Platform?
                    </h2>
                    <p className="text-lg text-[#334155] max-w-2xl mx-auto">
                        From building talent pools to managing projects, everything is integrated in one platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Search,
                            title: "Talent Pool Management",
                            description: "Recruit, evaluate, and categorize talents with advanced filtering and assessment tools.",
                            iconBg: "#2a9d8f",
                        },
                        {
                            icon: GraduationCap,
                            title: "Customized Training",
                            description: "Training programs aligned with enterprise requirements and industry best practices.",
                            iconBg: "#e9c46a",
                        },
                        {
                            icon: Users2,
                            title: "Mini-ODC Teams",
                            description: "Structured teams with mentor and senior guidance for optimal project delivery.",
                            iconBg: "#f4a261",
                        },
                        {
                            icon: ClipboardList,
                            title: "Project Management",
                            description: "Transparent progress tracking and quality assurance with comprehensive reporting.",
                            iconBg: "#264653",
                        },
                        {
                            icon: FileText,
                            title: "Flexible Contracts",
                            description: "Monthly, per-project, or direct hire options to match your business needs.",
                            iconBg: "#e76f51",
                        },
                        {
                            icon: UserCheck,
                            title: "Talent Transfer",
                            description: "Seamless onboarding when enterprises hire directly with knowledge handover.",
                            iconBg: "linear-gradient(135deg, #2a9d8f 0%, #e9c46a 100%)",
                        },
                    ].map((feature, index) => (
                        <Card
                            key={index}
                            className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md group"
                        >
                            <CardContent className="p-8 space-y-6">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300"
                                    style={{
                                        background: feature.iconBg.includes("gradient") ? feature.iconBg : feature.iconBg,
                                        backgroundColor: !feature.iconBg.includes("gradient") ? feature.iconBg : undefined,
                                    }}
                                >
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <div className="text-center space-y-3">
                                    <h3 className="font-bold text-xl text-[#264653]">{feature.title}</h3>
                                    <p className="text-[#334155] leading-relaxed">{feature.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
