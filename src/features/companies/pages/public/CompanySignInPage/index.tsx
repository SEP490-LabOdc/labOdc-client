import { Building2, Users2, FileText, Clock, ShieldCheck } from 'lucide-react';
import { motion } from "framer-motion";
import { LoginCompanyForm } from './components/login-company-form';

export default function CompanySigninPage() {
    return (
        <div className="min-h-screen flex">
            {/* Cột trái - Form Đăng nhập */}
            <div className="w-full lg:w-3/5 overflow-y-auto">
                <div className="p-6 lg:p-12 bg-muted min-h-full flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        className="w-full max-w-2xl mx-auto"
                    >
                        <div className="mb-8">
                            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                                Chào mừng trở lại!
                            </h1>
                            <p className="text-base text-foreground/80">
                                Đăng nhập để tiếp tục quản lý và kết nối với talent.
                            </p>
                        </div>

                        <LoginCompanyForm />
                    </motion.div>
                </div>
            </div>

            {/* Cột phải - Phần trang trí */}
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
                            Đăng nhập để quản trị tuyển dụng, đăng tin và theo dõi ứng viên — tất cả trong một bảng điều khiển
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
                            <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
                                <ShieldCheck className="h-6 w-6 mb-2 text-accent" />
                                <div className="font-semibold">Bảo mật & tin cậy</div>
                                <div className="text-primary-foreground/80">Mã hóa & kiểm duyệt dữ liệu</div>
                            </div>
                            <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm">
                                <Clock className="h-6 w-6 mb-2 text-accent" />
                                <div className="font-semibold">Hỗ trợ nhanh</div>
                                <div className="text-primary-foreground/80">Sẵn sàng 24/7</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}