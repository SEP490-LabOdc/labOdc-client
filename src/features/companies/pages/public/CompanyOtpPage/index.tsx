import { motion } from "framer-motion";
import { OtpForm } from './components/otp-company-form'; // Đảm bảo đường dẫn import chính xác
import { ShieldCheck } from 'lucide-react';

export default function VerifyOtpPage() {
    return (
        <div className="min-h-screen flex">
            {/* Cột trái - Form OTP */}
            <div className="w-full lg:w-3/5 overflow-y-auto">
                <div className="p-6 lg:p-12 bg-slate-50 min-h-full flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        className="w-full max-w-md mx-auto" // Giới hạn chiều rộng tối đa
                    >
                        <OtpForm />
                    </motion.div>
                </div>
            </div>

            {/* Cột phải - Phần trang trí (Giữ nguyên) */}
            <div className="hidden lg:flex w-2/5 bg-gradient-to-br from-[#264653] to-[#2a9d8f] items-center justify-center p-12 fixed right-0 top-0 h-screen">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="text-center text-white space-y-6"
                >
                    <div className="w-64 h-64 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <ShieldCheck className="w-24 h-24 text-[#e9c46a]" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Bảo mật là ưu tiên hàng đầu</h2>
                        <p className="text-lg text-white/90 max-w-md mx-auto">
                            Xác thực email giúp chúng tôi đảm bảo chỉ có bạn mới có quyền truy cập vào tài khoản doanh nghiệp của mình.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}