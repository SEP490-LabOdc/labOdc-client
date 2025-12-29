import { Card, CardContent } from '@/components/ui/card'
import { ClipboardList, ShieldCheck, GraduationCap, Wallet, UserCheck, Users2, Rocket } from 'lucide-react'

export function FeatureSection() {
    return (
        <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-balance text-foreground">
                        Tại sao nên chọn Nền tảng Lab-ODC?
                    </h2>
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                        Giải pháp toàn diện tích hợp từ đào tạo, quản lý dự án outsource đến chuyển giao nhân sự chất lượng cao cho doanh nghiệp.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Users2,
                            title: "Mô hình Mini-ODC",
                            description: "Các nhóm dự án được tổ chức bài bản, luôn có Mentor (Leader) dày dạn kinh nghiệm dẫn dắt và review code.",
                            iconBg: "bg-brand-orange",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Quy trình Duyệt 2 Lớp",
                            description: "Báo cáo được Lab Admin kiểm duyệt chuẩn format trước khi gửi Doanh nghiệp nghiệm thu, giảm thiểu sai sót.",
                            iconBg: "bg-primary",
                        },
                        {
                            icon: Wallet,
                            title: "Thanh toán An toàn",
                            description: "Áp dụng cơ chế 'Nghiệm thu trước - Trả tiền sau' theo từng Milestone. Doanh nghiệp chỉ trả tiền khi hài lòng.",
                            iconBg: "bg-secondary",
                        },
                        {
                            icon: ClipboardList,
                            title: "Quản lý Minh bạch",
                            description: "Theo dõi tiến độ dự án real-time. Hệ thống báo cáo, log chat và lịch sử giao dịch rõ ràng, minh bạch.",
                            iconBg: "bg-accent",
                        },
                        {
                            icon: GraduationCap,
                            title: "Đào tạo Thực chiến",
                            description: "Nhân sự được đào tạo trực tiếp trên dự án thật (On-job training), bám sát yêu cầu công nghệ của doanh nghiệp.",
                            iconBg: "bg-gradient-to-br from-secondary to-accent",
                        },
                        {
                            icon: UserCheck,
                            title: "Chuyển giao Nhân sự",
                            description: "Doanh nghiệp có thể tuyển dụng chính thức (Hiring) các nhân sự đã làm quen việc ngay sau khi dự án kết thúc.",
                            iconBg: "bg-green-600",
                        },
                    ].map((feature, index) => (
                        <Card
                            key={index}
                            className="bg-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border shadow-sm group overflow-hidden"
                        >
                            <CardContent className="p-8 space-y-6 relative z-10">
                                {/* Decorative background blob */}
                                <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-150 ${feature.iconBg}`}></div>

                                <div
                                    className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${feature.iconBg}`}
                                >
                                    <feature.icon className="h-7 w-7 text-white" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-foreground/70 leading-relaxed text-sm lg:text-base">
                                        {feature.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}