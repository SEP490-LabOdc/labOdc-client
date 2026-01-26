import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown, Code, Lightbulb, Monitor, Users, ShieldCheck } from 'lucide-react'

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
                                Xây dựng Đội ngũ Công nghệ Chất lượng cao với{" "}
                                <span className="relative inline-block">
                                    Mô hình Lab-ODC
                                    <div className="absolute -bottom-2 left-0 w-full h-2 bg-accent/40 rounded-full"></div>
                                </span>
                            </h1>
                            <p className="text-xl text-foreground/80 text-pretty leading-relaxed">
                                Kết nối Doanh nghiệp với Nhân tài thông qua đào tạo thực chiến và các nhóm Mini-ODC.
                                Quản lý dự án minh bạch, nghiệm thu theo cột mốc (Milestone) và đảm bảo chất lượng đầu ra.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="text-lg px-8 py-6 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Đăng Dự án Ngay
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-6 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold transition-all duration-300"
                            >
                                Tìm hiểu Quy trình
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center space-x-6 pt-4">
                            <div className="flex items-center space-x-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 bg-secondary rounded-full border-2 border-card flex items-center justify-center overflow-hidden"
                                        >
                                            {/* Giả lập avatar user */}
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400">
                                                {
                                                    i == 1 && (
                                                        <img src='https://tse3.mm.bing.net/th/id/OIP.TgBI7ji4aJUO7ttOfwKvTwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' />
                                                    )
                                                }
                                                {
                                                    i == 2 && (
                                                        <img src='https://cdn.brandfetch.io/id-EgVmHPF/w/1876/h/1876/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1745369140277' />
                                                    )
                                                }
                                                {
                                                    i == 3 && (
                                                        <img src='https://tse1.mm.bing.net/th/id/OIP.J1vbnsxIafx4xEbWahooTgAAAA?w=400&h=400&rs=1&pid=ImgDetMain&o=7&rm=3' />
                                                    )
                                                }
                                                {
                                                    i == 4 && (
                                                        <img src='https://tse4.mm.bing.net/th/id/OIP.efkVY5_7rv9Vf2uAyZWvIAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-primary">Mạng lưới tin cậy</p>
                                    <span className="text-sm text-foreground/70">Kết nối 100+ Doanh nghiệp & Mentor</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Hero Illustration */}
                    <div className="relative hidden lg:block">
                        <div className="relative bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
                            {/* Main Illustration Container */}
                            <div className="aspect-square bg-card rounded-2xl shadow-2xl p-6 relative overflow-hidden border border-border/50">
                                {/* Dashboard Mockup */}
                                <div className="space-y-6">
                                    {/* Header Mockup */}
                                    <div className="flex items-center justify-between border-b pb-4 border-border/50">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Monitor className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold text-primary">Tiến độ Dự án</span>
                                                <span className="block text-xs text-muted-foreground">E-commerce App Phase 1</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="px-2 py-1 text-[10px] font-medium bg-green-100 text-green-700 rounded-full">Đang chạy</span>
                                        </div>
                                    </div>

                                    {/* Milestone Progress Visual */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span>Milestone 2: Frontend Dev</span>
                                            <span className="text-brand-orange">75%</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-orange w-3/4 rounded-full"></div>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-100 flex items-center gap-1">
                                                <Code className="w-3 h-3" /> Code Review
                                            </div>
                                            <div className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-md border border-purple-100 flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" /> Admin Verified
                                            </div>
                                        </div>
                                    </div>

                                    {/* Team Collaboration Visual */}
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground mb-2">Đội ngũ Mini-ODC</p>
                                        <div className="grid grid-cols-4 gap-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="aspect-square bg-gradient-to-br from-accent/10 to-brand-orange/10 rounded-xl flex flex-col items-center justify-center border border-border/50 hover:shadow-md transition-all cursor-default"
                                                >
                                                    <Users className="h-4 w-4 text-primary mb-1" />
                                                    <div className="h-1.5 w-8 bg-primary/20 rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur shadow-lg rounded-lg border border-border/50 animate-bounce duration-[2000ms]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-xs font-semibold text-primary">Nghiệm thu & Giải ngân</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 px-4 py-2 bg-brand-dark-teal text-white shadow-lg rounded-lg flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-yellow-300" />
                                    <span className="text-xs font-bold">Mentor Support 24/7</span>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent/20 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-brand-orange/20 rounded-full blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
                <ChevronDown className="h-8 w-8 text-primary/50 hover:text-primary transition-colors" />
            </div>
        </section>
    )
}