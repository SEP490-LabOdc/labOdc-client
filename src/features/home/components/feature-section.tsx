import { Card, CardContent } from '@/components/ui/card'
import { ClipboardList, FileText, GraduationCap, Search, UserCheck, Users2 } from 'lucide-react'

export function FeatureSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-balance text-[#264653]">
                        Lý do bạn nên chọn nền tảng ODC phòng lab của chúng tôi ?
                    </h2>
                    <p className="text-lg text-[#334155] max-w-2xl mx-auto">
                        Từ việc xây dựng nguồn nhân lực đến quản lý dự án, mọi thứ đều được tích hợp trong một nền tảng.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Search,
                            title: "Quản lý nguồn nhân tài",
                            description: "Tuyển chọn, đánh giá và phân loại nhân sự với các công cụ lọc và đánh giá nâng cao.",
                            iconBg: "#2a9d8f",
                        },
                        {
                            icon: GraduationCap,
                            title: "Đào tạo tùy chỉnh",
                            description: "Chương trình đào tạo được thiết kế phù hợp với yêu cầu doanh nghiệp và chuẩn ngành.",
                            iconBg: "#e9c46a",
                        },
                        {
                            icon: Users2,
                            title: "Nhóm Mini-ODC",
                            description: "Các nhóm làm việc có cấu trúc, được hướng dẫn bởi mentor và senior để đảm bảo hiệu quả dự án tối ưu.",
                            iconBg: "#f4a261",
                        },
                        {
                            icon: ClipboardList,
                            title: "Quản lý dự án",
                            description: "Theo dõi tiến độ minh bạch và đảm bảo chất lượng với hệ thống báo cáo toàn diện.",
                            iconBg: "#264653",
                        },
                        {
                            icon: FileText,
                            title: "Hợp đồng linh hoạt",
                            description: "Tùy chọn theo tháng, theo dự án hoặc tuyển dụng trực tiếp để phù hợp với nhu cầu doanh nghiệp.",
                            iconBg: "#e76f51",
                        },
                        {
                            icon: UserCheck,
                            title: "Chuyển giao nhân sự",
                            description: "Quy trình onboard liền mạch khi doanh nghiệp tuyển dụng trực tiếp, kèm bàn giao kiến thức đầy đủ.",
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
