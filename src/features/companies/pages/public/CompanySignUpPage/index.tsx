import { Building2, Users2, FileText } from 'lucide-react';
import { motion } from "framer-motion";
import { RegisterCompanyForm } from './components/register-company-form';
import { useCompanyRegister } from '@/hooks/api'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { CompanyCreatePayload, CompanyPayload } from '@/features/companies/types.ts'

export default function CompanySignUpPage() {
    const navigate = useNavigate();

    const { mutateAsync, isPending } = useCompanyRegister();

    const handleRegisterSubmit = async (data: CompanyCreatePayload | CompanyPayload) => {
        try {
            await mutateAsync(data);

            if ('email' in data && data.email) {
                await navigate({ to: '/verify-otp', search: { companyEmail: data.email } });
                toast.success('Đăng ký công ty thành công!');
            }
        } catch (error: unknown) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Column - Registration Form (60%) */}
            <div className="w-full lg:w-3/5 overflow-y-auto">
                <div className="p-6 lg:p-12 bg-muted min-h-full">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        className="w-full max-w-2xl mx-auto"
                    >
                        <div className="mb-8">
                            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                                Đăng ký tài khoản doanh nghiệp
                            </h1>
                            <p className="text-base text-foreground/80">
                                Hoàn thành thông tin để tham gia hệ sinh thái LabOdc
                            </p>
                        </div>

                        <RegisterCompanyForm
                            submitButtonText="Đăng ký doanh nghiệp"
                            onSubmit={handleRegisterSubmit}
                            isLoading={isPending}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Right Column - Illustration (40%) */}
            <div className="hidden lg:flex w-2/5 bg-gradient-to-br from-primary to-secondary items-center justify-center p-12 fixed right-0 top-0 h-screen">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="text-center text-primary-foreground space-y-6"
                >
                    <div className="w-64 h-64 mx-auto bg-primary-foreground/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Building2 className="w-24 h-24 text-accent" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Chào mừng đến với LabOdc</h2>
                        <p className="text-lg text-primary-foreground/90 max-w-md mx-auto">
                            Kết nối với hệ sinh thái talent hàng đầu từ FPTU và cộng đồng lập trình Việt Nam
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
                            <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
                                <FileText className="h-6 w-6 mb-2 text-accent" />
                                <div className="font-semibold">Quy trình đơn giản</div>
                                <div className="text-primary-foreground/80">Xét duyệt trong 24h</div>
                            </div>
                            <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
                                <Users2 className="h-6 w-6 mb-2 text-accent" />
                                <div className="font-semibold">Talent chất lượng</div>
                                <div className="text-primary-foreground/80">Đã được xác thực</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

