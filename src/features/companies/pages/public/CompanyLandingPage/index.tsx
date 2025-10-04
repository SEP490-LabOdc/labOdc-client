import React, { useState } from 'react';
import {
    Building2,
    Users,
    Target,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Star,
    Mail,
    Phone,
} from 'lucide-react';
import fpt_banner from '@/assets/FPT-HCM-Campus.jpg'
import { Link } from '@tanstack/react-router';

interface CompanyRegistrationForm {
    companyName: string;
    email: string;
    contactPerson: string;
    note: string;
}

const CompanyLandingPage: React.FC = () => {
    const [formData, setFormData] = useState<CompanyRegistrationForm>({
        companyName: '',
        email: '',
        contactPerson: '',
        note: ''
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-primary py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h1 className="text-5xl font-bold text-primary-foreground mb-6">
                                Kết nối doanh nghiệp với tài năng trẻ tại FPTU
                            </h1>
                            <p className="text-xl text-primary-foreground/80 mb-8">
                                Triển khai dự án thực tế, tiếp cận nhân lực trẻ, đồng hành đào tạo thế hệ tương lai
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to='/company-register' className="bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)]/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
                                    Đăng ký doanh nghiệp
                                </Link>
                                <button className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                                    Liên hệ tư vấn
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="bg-card rounded-2xl shadow-2xl p-8">
                                <div className="bg-gradient-to-r from-secondary to-[var(--color-brand-orange)] h-4 rounded-t-lg mb-6"></div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                                            <Users className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-card-foreground">Dashboard LabODC</h3>
                                            <p className="text-muted-foreground text-sm">Quản lý dự án minh bạch</p>
                                        </div>
                                    </div>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-muted-foreground">Tiến độ dự án</span>
                                            <span className="text-sm text-secondary font-semibold">75%</span>
                                        </div>
                                        <div className="w-full bg-border rounded-full h-2">
                                            <div className="bg-secondary h-2 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Thách thức của doanh nghiệp hiện tại
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-destructive" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-foreground">Khó tuyển dụng nhân sự trẻ phù hợp</h3>
                            <p className="text-muted-foreground">Thiếu kênh tiếp cận sinh viên chất lượng</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-foreground">Chi phí đào tạo cao, rủi ro tuyển sai</h3>
                            <p className="text-muted-foreground">Không thể đánh giá năng lực thực tế trước khi tuyển</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building2 className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-foreground">Thiếu môi trường thử nghiệm ý tưởng nhanh</h3>
                            <p className="text-muted-foreground">Cần đội ngũ linh hoạt cho các dự án pilot</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            LabODC - Giải pháp toàn diện
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl border border-border hover:shadow-lg hover:border-[var(--color-brand-orange)]/30 transition-all">
                            <div className="w-16 h-16 bg-[var(--color-brand-orange)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-[var(--color-brand-orange)]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-foreground">Tiếp cận sinh viên FPTU chất lượng</h3>
                            <p className="text-muted-foreground">Kết nối trực tiếp với pool tài năng trẻ được đào tạo bài bản</p>
                        </div>
                        <div className="text-center p-6 rounded-xl border border-border hover:shadow-lg hover:border-secondary/30 transition-all">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-foreground">Quản lý dự án minh bạch</h3>
                            <p className="text-muted-foreground">Milestone rõ ràng, báo cáo định kỳ, mentor hỗ trợ</p>
                        </div>
                        <div className="text-center p-6 rounded-xl border border-border hover:shadow-lg hover:border-accent/30 transition-all">
                            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-foreground">Giảm chi phí, tăng hiệu quả</h3>
                            <p className="text-muted-foreground">Thử nghiệm ý tưởng với chi phí thấp, rủi ro tối thiểu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-20 bg-gradient-to-r from-muted/50 to-primary/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Lợi ích chính cho doanh nghiệp
                        </h2>
                        <div className="inline-block bg-destructive text-white px-4 py-2 rounded-full text-sm font-semibold">
                            🔥 Ưu đãi đặc biệt cho 20 doanh nghiệp đầu tiên
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-[var(--color-brand-orange)]">
                            <div className="w-12 h-12 bg-[var(--color-brand-orange)]/10 rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-[var(--color-brand-orange)]" />
                            </div>
                            <h3 className="font-semibold mb-2 text-card-foreground">Nhân lực trẻ & sáng tạo</h3>
                            <p className="text-muted-foreground text-sm">Sinh viên tiếp cận công nghệ & xu hướng mới</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-secondary">
                            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                                <CheckCircle className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="font-semibold mb-2 text-card-foreground">Giảm rủi ro tuyển dụng</h3>
                            <p className="text-muted-foreground text-sm">Thử việc trước khi tuyển chính thức</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-accent">
                            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="font-semibold mb-2 text-card-foreground">Quy trình minh bạch</h3>
                            <p className="text-muted-foreground text-sm">Có mentor, báo cáo định kỳ</p>
                        </div>
                        <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-primary">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2 text-card-foreground">Kết nối dài hạn</h3>
                            <p className="text-muted-foreground text-sm">Cơ hội hợp tác chiến lược với FPTU</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Quy trình hợp tác đơn giản
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex-1 text-center">
                            <div className="w-16 h-16 bg-[var(--color-brand-orange)] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                                1
                            </div>
                            <h3 className="font-semibold mb-2 text-foreground">Đăng ký & xác thực</h3>
                            <p className="text-muted-foreground">Đăng ký doanh nghiệp và xác thực thông tin</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-accent hidden md:block" />
                        <div className="flex-1 text-center">
                            <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                                2
                            </div>
                            <h3 className="font-semibold mb-2 text-foreground">Khởi tạo dự án</h3>
                            <p className="text-muted-foreground">Tạo dự án với yêu cầu cụ thể</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-accent hidden md:block" />
                        <div className="flex-1 text-center">
                            <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                                3
                            </div>
                            <h3 className="font-semibold mb-2 text-foreground">Kết nối team</h3>
                            <p className="text-muted-foreground">Kết nối với sinh viên & mentor phù hợp</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-accent hidden md:block" />
                        <div className="flex-1 text-center">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                                4
                            </div>
                            <h3 className="font-semibold mb-2 text-foreground">Nhận kết quả</h3>
                            <p className="text-muted-foreground">Báo cáo định kỳ & sản phẩm cuối</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Đối tác tin tưởng
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[var(--color-brand-orange)]">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/50/50" alt="Company Logo" className="w-12 h-12 rounded-lg mr-3" />
                                <div>
                                    <h4 className="font-semibold text-card-foreground">Tech Company A</h4>
                                    <div className="flex text-accent">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground italic">
                                "LabODC giúp chúng tôi thử nghiệm ý tưởng nhanh với đội ngũ sinh viên đầy sáng tạo."
                            </p>
                        </div>
                        <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-secondary">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/50/50" alt="Company Logo" className="w-12 h-12 rounded-lg mr-3" />
                                <div>
                                    <h4 className="font-semibold text-card-foreground">Startup B</h4>
                                    <div className="flex text-accent">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground italic">
                                "Quy trình minh bạch, mentor hỗ trợ tốt. Chúng tôi đã tìm được nhiều tài năng trẻ."
                            </p>
                        </div>
                        <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-accent">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/50/50" alt="Company Logo" className="w-12 h-12 rounded-lg mr-3" />
                                <div>
                                    <h4 className="font-semibold text-card-foreground">Enterprise C</h4>
                                    <div className="flex text-accent">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground italic">
                                "Chi phí hợp lý, kết quả vượt mong đợi. Đây là cầu nối tuyệt vời với FPTU."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About FPTU & LabODC */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <img src={fpt_banner} alt="FPTU Campus" className="rounded-2xl shadow-lg border-4 border-accent/20" />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-bold text-foreground mb-6">
                                Về FPTU & LabODC
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Đại học FPT (FPTU) là một trong những trường đại học hàng đầu về công nghệ thông tin tại Việt Nam,
                                với hơn 15 năm kinh nghiệm đào tạo nhân lực chất lượng cao.
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">
                                LabODC được thành lập như một cầu nối giữa học thuật và thực tiễn, giúp sinh viên tiếp cận
                                dự án thực tế và doanh nghiệp tìm kiếm tài năng trẻ.
                            </p>
                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[var(--color-brand-orange)]">500+</div>
                                    <div className="text-muted-foreground">Sinh viên</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-secondary">100+</div>
                                    <div className="text-muted-foreground">Dự án</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-accent">50+</div>
                                    <div className="text-muted-foreground">Doanh nghiệp</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Sẵn sàng đồng hành cùng LabODC?
                        </h2>
                        <p className="text-xl opacity-90">
                            Bắt đầu hành trình kết nối với tài năng trẻ FPTU ngay hôm nay
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handleFormSubmit} className="bg-card rounded-2xl p-8 text-card-foreground shadow-2xl">
                            <h3 className="text-2xl font-bold mb-6 text-center">Đăng ký doanh nghiệp</h3>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Tên doanh nghiệp *</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors bg-background"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email liên hệ *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors bg-background"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Người liên hệ *</label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors bg-background"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Ghi chú</label>
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors bg-background"
                                    placeholder="Mô tả ngắn về nhu cầu hợp tác..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)]/90 text-white py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
                            >
                                Đăng ký ngay
                            </button>
                        </form>
                    </div>

                    <div className="text-center mt-8">
                        <p className="mb-4 opacity-90">Hoặc liên hệ trực tiếp:</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                                <Mail className="w-5 h-5 text-accent" />
                                <span>contact@labodc.fptu.edu.vn</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
                                <Phone className="w-5 h-5 text-accent" />
                                <span>+84 123 456 789</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CompanyLandingPage;
