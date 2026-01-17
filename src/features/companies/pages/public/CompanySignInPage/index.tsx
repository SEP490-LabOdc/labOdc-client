import { Building2 } from 'lucide-react';
import { LoginCompanyForm } from './components/login-company-form';
import { TwoColumnAuthLayout } from '@/features/auth/components/two-column-auth-layout';

export default function CompanySigninPage() {
    return (
        <TwoColumnAuthLayout
            title="Chào mừng đến với LabOdc"
            description="Đăng nhập để quản trị tuyển dụng, đăng tin và theo dõi ứng viên — tất cả trong một bảng điều khiển"
            icon={Building2}
            leftColumn={
                <>
                    <div className="mb-8">
                        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                            Chào mừng trở lại!
                        </h1>
                        <p className="text-base text-foreground/80">
                            Đăng nhập để tiếp tục quản lý và kết nối với talent.
                        </p>
                    </div>

                    <LoginCompanyForm />
                </>
            }
        />
    );
}