import { CheckCircle, ArrowLeft, Mail, Clock } from 'lucide-react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export function SuccessRegisterForm() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate({ to: '/' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center max-w-2xl mx-auto"
        >
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
            >
                <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
            >
                <h1 className="text-3xl lg:text-4xl font-bold text-[#264653] mb-4">
                    Đăng ký thành công! 🎉
                </h1>
                <h2 className="text-xl lg:text-2xl font-semibold text-[#2a9d8f] mb-4">
                    Thông tin doanh nghiệp đã được gửi
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Cảm ơn bạn đã đăng ký tài khoản doanh nghiệp. Thông tin của bạn đã được gửi thành công và đang chờ xác nhận từ Lab Admin.
                </p>
            </motion.div>

            {/* Next Steps */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8 p-6 bg-blue-50 rounded-md border border-blue-200"
            >
                <div className="flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-amber-600 mr-2" />
                    <h3 className="text-lg font-semibold text-[#264653]">
                        Đang chờ xác nhận
                    </h3>
                </div>
                <p className="text-gray-700 mb-4">
                    Lab Admin sẽ xem xét và xác nhận thông tin doanh nghiệp của bạn trong thời gian sớm nhất.
                </p>
                <div className="flex items-center justify-center text-amber-700">
                    <Mail className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                        Bạn sẽ nhận được email thông báo khi tài khoản được kích hoạt
                    </span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-8 p-6 bg-blue-50 rounded-md border border-blue-200"
            >
                <h3 className="text-lg font-semibold text-[#264653] mb-3">
                    Sau khi được xác nhận:
                </h3>
                <ul className="text-left text-gray-700 space-y-2">
                    <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#2a9d8f] rounded-full mr-3"></div>
                        Kiểm tra email để nhận thông tin đăng nhập
                    </li>
                    <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#2a9d8f] rounded-full mr-3"></div>
                        Đăng nhập vào tài khoản doanh nghiệp
                    </li>
                    <li className="flex items-center">
                        <div className="w-2 h-2 bg-[#2a9d8f] rounded-full mr-3"></div>
                        Bắt đầu sử dụng các tính năng của LabOdc
                    </li>
                </ul>
            </motion.div>

            {/* Action Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
            >
                <Button
                    onClick={handleBackToHome}
                    size="lg"
                    className="w-full lg:w-auto px-8 py-4 text-lg font-semibold bg-[#2a9d8f] hover:bg-[#264653] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Về trang chủ
                </Button>
            </motion.div>

            {/* Additional Info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="mt-8 text-sm text-gray-500"
            >
                <p>
                    Cần hỗ trợ? Liên hệ với chúng tôi tại{' '}
                    <a href="mailto:support@labodc.com" className="text-[#2a9d8f] hover:underline">
                        support@labodc.com
                    </a>
                </p>
            </motion.div>
        </motion.div>
    );
}
