import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Briefcase, Building2, CheckCircle2, Handshake, ShieldCheck, Sparkles, Star, Users2 } from 'lucide-react';
import { motion } from "framer-motion";
import { RegisterCompanyForm } from './components/register-company-form';

// --- Helper components ---
const Stat = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
    <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 flex items-start gap-4">
            <div className="p-2 rounded-xl bg-muted">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-muted-foreground">{desc}</div>
            </div>
        </CardContent>
    </Card>
);


const Feature = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
    <div className="flex gap-4">
        <div className="p-2 rounded-xl bg-muted shrink-0"><Icon className="h-5 w-5" /></div>
        <div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{desc}</div>
        </div>
    </div>
);

export default function CompanySignUpPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none [background:radial-gradient(50%_50%_at_50%_0%,hsl(var(--primary)/.1),transparent_70%)]" />
                <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <Badge className="rounded-full px-3 py-1" variant="secondary">
                            <ShieldCheck className="h-4 w-4 mr-1" /> LabOdc for Employers
                        </Badge>
                        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
                            Tuyển đúng Người – Nhanh, Minh bạch, Tối ưu chi phí
                        </h1>
                        <p className="mt-4 text-muted-foreground max-w-xl">
                            Kết nối với Talent Pool của trường FPTU & cộng đồng lập trình. Đăng dự án theo mô hình ODC, quản lý tiến độ, và đánh giá hiệu suất ngay trên một nền tảng.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4" /> SLA phản hồi 24h</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4" /> Verified Mentors</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4" /> Bảo mật hợp đồng</div>
                        </div>
                    </div>

                    {/* Signup Card */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <Card className="rounded-2xl shadow-lg">
                            <CardHeader>
                                <CardTitle>Tạo tài khoản nhà tuyển dụng</CardTitle>
                                <CardDescription>Miễn phí khởi tạo. Xét duyệt trong 24h.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RegisterCompanyForm />
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Trust / Logos */}
            <section className="container mx-auto px-4 pb-10">
                <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-muted-foreground">
                    <span>Trusted by</span>
                    <div className="flex gap-6 opacity-80">
                        <div className="h-6 w-20 bg-muted rounded" />
                        <div className="h-6 w-20 bg-muted rounded" />
                        <div className="h-6 w-20 bg-muted rounded" />
                        <div className="h-6 w-20 bg-muted rounded" />
                    </div>
                </div>
            </section>

            <Separator />

            {/* Value Props */}
            <section className="container mx-auto px-4 py-14 grid md:grid-cols-3 gap-6">
                <Stat icon={Users2} title="Talent Pool đã xác thực" desc="Ứng viên từ trường đại học & cộng đồng có hồ sơ kỹ thuật rõ ràng." />
                <Stat icon={Handshake} title="Mentor dẫn dắt" desc="Dự án có Mentor bảo chứng chất lượng & quy trình." />
                <Stat icon={Briefcase} title="Linh hoạt theo ODC" desc="Mở rộng/thu hẹp nhóm theo sprint, minh bạch chi phí." />
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 pb-20 grid md:grid-cols-2 gap-10 items-start">
                <div className="space-y-5">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tại sao chọn LabOdc?</h2>
                    <p className="text-muted-foreground">Tập trung tuyển nhanh kỹ sư phù hợp, rút ngắn thời gian on-boarding và kiểm soát chất lượng qua mentor & dashboard.</p>
                    <div className="space-y-4">
                        <Feature icon={Sparkles} title="Gợi ý talent thông minh" desc="Thuật toán matching theo skill, availability, rate." />
                        <Feature icon={Building2} title="Quy trình pháp lý gọn" desc="Mẫu NDA/SoW có sẵn, phê duyệt trực tuyến." />
                        <Feature icon={ShieldCheck} title="Chấm công & nghiệm thu" desc="Theo dõi timesheet, deliverable, review 360°." />
                        <Feature icon={Star} title="Đánh giá minh bạch" desc="Điểm hiệu suất từng sprint, hồ sơ công khai trong hệ sinh thái." />
                    </div>
                </div>

                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Quy trình 3 bước</CardTitle>
                        <CardDescription>Vào việc chỉ trong 24–72h.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="flex gap-3">
                            <Badge className="rounded-full">1</Badge>
                            <div>
                                <div className="font-medium">Tạo tài khoản & xác minh doanh nghiệp</div>
                                <div className="text-sm text-muted-foreground">Cung cấp MST, email domain công ty.</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Badge className="rounded-full">2</Badge>
                            <div>
                                <div className="font-medium">Mở yêu cầu tuyển/ODC</div>
                                <div className="text-sm text-muted-foreground">Mô tả stack, JD, timeline, ngân sách.</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Badge className="rounded-full">3</Badge>
                            <div>
                                <div className="font-medium">Chọn team & kick‑off</div>
                                <div className="text-sm text-muted-foreground">Mentor điều phối, theo dõi sprint trên dashboard.</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Footer CTA */}
            <footer className="border-t">
                <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <div className="font-semibold flex items-center gap-2"><Building2 className="h-5 w-5" /> LabOdc for Employers</div>
                        <p className="text-sm text-muted-foreground">Cần hỗ trợ? Liên hệ <a className="underline" href="mailto:biz@labodc.dev">biz@labodc.dev</a></p>
                    </div>
                    <Button asChild>
                        <a href="#top"><ArrowRight className="mr-2 h-4 w-4" /> Đăng ký ngay</a>
                    </Button>
                </div>
            </footer>
        </div>
    )
}

