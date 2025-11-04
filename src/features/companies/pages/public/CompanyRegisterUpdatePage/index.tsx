import { Building2, Users2, FileText } from 'lucide-react';
import { motion } from "framer-motion";
import { useCompanyRegisterUpdate } from '@/hooks/api'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { CompanyPayload } from '@/features/companies/types.ts'
import {
  RegisterCompanyForm
} from '../CompanySignUpPage/components/register-company-form.tsx'
import { useUpdateCompanyRegistration } from '@/hooks/api/companies/queries.ts'

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
    <div className="min-h-screen flex">
      {/* Left Column - Registration Form (60%) */}
      <div className="w-full lg:w-3/5 overflow-y-auto">
        <div className="p-6 lg:p-12 bg-slate-50 min-h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#264653] mb-2">
                Cập nhật thông tin đăng ký
              </h1>
              <p className="text-base text-gray-600">
                Hoàn thành thông tin để tham gia hệ sinh thái LabOdc
              </p>
            </div>

            <RegisterCompanyForm
              initialData={companyDetail.data.data}
              submitButtonText="Lưu cập nhật"
              onSubmit={handleRegisterSubmit}
              isLoading={isPending}
            />
          </motion.div>
        </div>
      </div>

      {/* Right Column - Illustration (40%) */}
      <div
        className="hidden lg:flex w-2/5 bg-gradient-to-br from-[#264653] to-[#2a9d8f] items-center justify-center p-12 fixed right-0 top-0 h-screen">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-center text-white space-y-6"
        >
          <div className="w-64 h-64 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Building2 className="w-24 h-24 text-[#e9c46a]" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Chào mừng đến với LabOdc</h2>
            <p className="text-lg text-white/90 max-w-md mx-auto">
              Kết nối với hệ sinh thái talent hàng đầu từ FPTU và cộng đồng lập trình Việt Nam
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <FileText className="h-6 w-6 mb-2 text-[#e9c46a]" />
                <div className="font-semibold">Quy trình đơn giản</div>
                <div className="text-white/80">Xét duyệt trong 24h</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Users2 className="h-6 w-6 mb-2 text-[#e9c46a]" />
                <div className="font-semibold">Talent chất lượng</div>
                <div className="text-white/80">Đã được xác thực</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

