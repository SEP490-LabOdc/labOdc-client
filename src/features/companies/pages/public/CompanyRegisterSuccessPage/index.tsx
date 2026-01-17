import { Users2, FileText, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { SuccessRegisterForm } from './Components/success-register-form';
import { TwoColumnAuthLayout, type Feature } from '@/features/auth/components/two-column-auth-layout';

const successFeatures: Feature[] = [
    {
        icon: FileText,
        title: 'Đăng tin tuyển dụng',
        description: 'Tạo job posting dễ dàng',
    },
    {
        icon: Users2,
        title: 'Quản lý ứng viên',
        description: 'Theo dõi & đánh giá CV',
    },
    {
        icon: ShieldCheck,
        title: 'Bảo mật cao',
        description: 'Dữ liệu được mã hóa',
    },
    {
        icon: Clock,
        title: 'Hỗ trợ 24/7',
        description: 'Luôn sẵn sàng giúp đỡ',
    },
];

export default function CompanyRegisterSuccessPage() {
    return (
        <TwoColumnAuthLayout
            title="Chào mừng đến với LabOdc!"
            description="Bạn đã sẵn sàng để khám phá và tận dụng tối đa các tính năng tuyệt vời của nền tảng"
            icon={CheckCircle}
            features={successFeatures}
            leftColumn={<SuccessRegisterForm />}
        />
    );
}
