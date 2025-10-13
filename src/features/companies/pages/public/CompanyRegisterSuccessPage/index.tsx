import { Users2, FileText, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { SuccessRegisterForm } from './Components/success-register-form';

export default function CompanyRegisterSuccessPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left Column - Success Form (60%) */}
            <div className="w-full lg:w-3/5 overflow-y-auto">
                <div className="p-6 lg:p-12 bg-slate-50 min-h-full flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        className="w-full max-w-2xl mx-auto"
                    >
                        <SuccessRegisterForm />
                    </motion.div>
                </div>
            </div>

            {/* Right Column - Illustration (40%) */}
            <div className="hidden lg:flex w-2/5 bg-gradient-to-br from-[#264653] to-[#2a9d8f] items-center justify-center p-12 fixed right-0 top-0 h-screen">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="text-center text-white space-y-6"
                >
                    <div className="w-64 h-64 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle className="w-24 h-24 text-[#e9c46a]" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Chào mừng đến với LabOdc!</h2>
                        <p className="text-lg text-white/90 max-w-md mx-auto">
                            Bạn đã sẵn sàng để khám phá và tận dụng tối đa các tính năng tuyệt vời của nền tảng
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                <FileText className="h-6 w-6 mb-2 text-[#e9c46a]" />
                                <div className="font-semibold">Đăng tin tuyển dụng</div>
                                <div className="text-white/80">Tạo job posting dễ dàng</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                <Users2 className="h-6 w-6 mb-2 text-[#e9c46a]" />
                                <div className="font-semibold">Quản lý ứng viên</div>
                                <div className="text-white/80">Theo dõi & đánh giá CV</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                <ShieldCheck className="h-6 w-6 mb-2 text-[#e9c46a]" />
                                <div className="font-semibold">Bảo mật cao</div>
                                <div className="text-white/80">Dữ liệu được mã hóa</div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                <Clock className="h-6 w-6 mb-2 text-[#e9c46a]" />
                                <div className="font-semibold">Hỗ trợ 24/7</div>
                                <div className="text-white/80">Luôn sẵn sàng giúp đỡ</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
