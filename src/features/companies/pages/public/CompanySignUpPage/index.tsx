import { Building2, Users2, FileText } from 'lucide-react';
import { RegisterCompanyForm } from './components/register-company-form';
import { useCompanyRegister } from '@/hooks/api'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { CompanyCreatePayload, CompanyPayload } from '@/features/companies/types.ts'
import { TwoColumnAuthLayout, type Feature } from '@/features/auth/components/two-column-auth-layout'

const signUpFeatures: Feature[] = [
    {
        icon: FileText,
        title: 'Quy trình đơn giản',
        description: 'Xét duyệt trong 24h',
    },
    {
        icon: Users2,
        title: 'Talent chất lượng',
        description: 'Đã được xác thực',
    },
]

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
        <TwoColumnAuthLayout
            title="Chào mừng đến với LabOdc"
            description="Kết nối với hệ sinh thái talent hàng đầu từ FPTU và cộng đồng lập trình Việt Nam"
            icon={Building2}
            features={signUpFeatures}
            leftColumn={
                <>
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
                </>
            }
        />
    );
}

