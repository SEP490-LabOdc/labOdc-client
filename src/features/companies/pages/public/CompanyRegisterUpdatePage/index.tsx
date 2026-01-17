import { Building2, Users2, FileText } from 'lucide-react';
import { useCompanyRegisterUpdate } from '@/hooks/api'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { CompanyPayload } from '@/features/companies/types.ts'
import {
  RegisterCompanyForm
} from '../CompanySignUpPage/components/register-company-form.tsx'
import { useUpdateCompanyRegistration } from '@/hooks/api/companies/queries.ts'
import { TwoColumnAuthLayout, type Feature } from '@/features/auth/components/two-column-auth-layout'

const updateFeatures: Feature[] = [
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
];

export function CompanyRegisterUpdatePage() {
  const navigate = useNavigate();
  const token = useSearch({ from: '/company-register/update' }).token;

  const companyDetail= useUpdateCompanyRegistration(token);

  const { mutateAsync, isPending } = useCompanyRegisterUpdate(token);

  const handleRegisterSubmit = async (data: CompanyPayload) => {
    try {
      await mutateAsync(data);
      toast.success('Cập nhật thông tin đăng ký thành công!')
      await navigate({ to: '/company-register-success' });
    } catch (error: any) {
      console.error(error);

      const errorMessage = error?.response?.data?.message ||
        error?.message ||
        "Cập nhật thông tin thất bại. Vui lòng thử lại.";

      toast.error(errorMessage);
    }
  };

  if (companyDetail.isLoading) {
    return <div>Loading...</div>;
  }

  if(!token) {
    navigate({ to: '/company-register' })
    toast.error('Liên kết cập nhật không hợp lệ hoặc đã hết hạn. Vui lòng đăng ký lại.')
  }

  return (
    <TwoColumnAuthLayout
      title="Chào mừng đến với LabOdc"
      description="Kết nối với hệ sinh thái talent hàng đầu từ FPTU và cộng đồng lập trình Việt Nam"
      icon={Building2}
      features={updateFeatures}
      leftColumn={
        <>
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Cập nhật thông tin đăng ký
            </h1>
            <p className="text-base text-foreground/80">
              Hoàn thành thông tin để tham gia hệ sinh thái LabOdc
            </p>
          </div>

          <RegisterCompanyForm
            initialData={companyDetail.data.data}
            submitButtonText="Lưu cập nhật"
            onSubmit={handleRegisterSubmit}
            isLoading={isPending}
          />
        </>
      }
    />
  );
}

