import React from 'react'

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto my-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">

            <header className="bg-blue-900 text-white p-10 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 uppercase tracking-wide">Điều Khoản Sử Dụng</h1>
                    <p className="text-blue-200 text-sm md:text-base font-light">Hệ thống Lab-ODC</p>
                    <div className="mt-4 inline-block bg-blue-800 rounded-full px-4 py-1 text-xs text-blue-200 border border-blue-700">
                        Ngày cập nhật: 24/12/2025
                    </div>
                </div>
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-blue-800 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-blue-600 rounded-full opacity-30 blur-2xl"></div>
            </header>

            <main className="p-8 md:p-12 space-y-10">

                <section className="prose max-w-none text-slate-600">
                    <p className="leading-relaxed">
                        Chào mừng bạn đến với <span className="font-bold text-blue-900">Lab-ODC</span> (sau đây gọi tắt là "Hệ thống" hoặc "Chúng tôi"). Việc bạn truy cập, đăng ký và sử dụng dịch vụ trên hệ thống đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều khoản dưới đây.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">1</span>
                        Định nghĩa thuật ngữ
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-600 marker:text-blue-500">
                        <li><strong className="text-slate-800">Company (Doanh nghiệp):</strong> Người dùng có nhu cầu đăng dự án, tuyển dụng nhân sự và thanh toán chi phí.</li>
                        <li><strong className="text-slate-800">Talent/Mentor (Nhân sự):</strong> Người dùng tham gia thực hiện dự án, bao gồm sinh viên, lập trình viên và người hướng dẫn chuyên môn.</li>
                        <li><strong className="text-slate-800">Lab Admin (Quản trị viên):</strong> Đội ngũ vận hành hệ thống, chịu trách nhiệm kiểm duyệt và hỗ trợ giải quyết tranh chấp.</li>
                        <li><strong className="text-slate-800">Milestone (Giai đoạn):</strong> Một phần công việc cụ thể của dự án với thời hạn và ngân sách xác định.</li>
                        <li><strong className="text-slate-800">Ví hệ thống (Wallet):</strong> Tài khoản điện tử trên hệ thống dùng để lưu trữ, nạp và rút tiền.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">2</span>
                        Tài khoản và Bảo mật
                    </h2>
                    <ul className="list-decimal pl-6 space-y-3 text-slate-600 marker:font-semibold marker:text-slate-500">
                        <li><strong className="text-slate-800">Đăng ký:</strong> Bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật (bao gồm email, số điện thoại xác thực OTP, giấy phép kinh doanh đối với Company).</li>
                        <li><strong className="text-slate-800">Bảo mật:</strong> Bạn chịu trách nhiệm bảo quản mật khẩu đăng nhập. Mọi hoạt động phát sinh từ tài khoản của bạn sẽ do bạn chịu trách nhiệm hoàn toàn.</li>
                        <li><strong className="text-slate-800">Định danh:</strong> Lab-ODC có quyền yêu cầu xác thực danh tính (KYC) hoặc xác thực doanh nghiệp (KYB) trước khi cho phép rút tiền hoặc tạo dự án.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">3</span>
                        Quy định về Dự án và Hợp tác
                    </h2>
                    <ul className="list-decimal pl-6 space-y-3 text-slate-600 marker:font-semibold marker:text-slate-500">
                        <li><strong className="text-slate-800">Đăng dự án:</strong> Company chịu trách nhiệm về tính pháp lý và nội dung của dự án đăng tuyển. Không đăng các dự án vi phạm pháp luật hoặc thuần phong mỹ tục.</li>
                        <li><strong className="text-slate-800">Ứng tuyển & Cam kết:</strong> Talent/Mentor khi ứng tuyển (Apply) phải đảm bảo có đủ năng lực và thời gian thực hiện. Việc bỏ dở dự án không lý do chính đáng sẽ ảnh hưởng đến điểm uy tín (Rating).</li>
                        <li><strong className="text-slate-800">Giới hạn:</strong> Talent chỉ được tham gia tối đa <span className="bg-yellow-100 px-1 rounded text-yellow-800 font-semibold">03 dự án</span> active cùng một lúc để đảm bảo chất lượng công việc.</li>
                    </ul>
                </section>

                <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                        <span className="bg-blue-600 text-white text-sm font-bold mr-3 px-2.5 py-0.5 rounded">4</span>
                        Quy trình Báo cáo và Nghiệm thu (Quan trọng)
                    </h2>
                    <p className="mb-4 text-sm text-blue-800 italic">Hệ thống áp dụng quy trình kiểm duyệt 2 lớp để đảm bảo chất lượng:</p>
                    <ul className="list-decimal pl-6 space-y-3 text-slate-700 marker:font-semibold marker:text-blue-700">
                        <li>
                            <strong>Nộp báo cáo:</strong> Mentor nộp báo cáo tiến độ (Report) khi hoàn thành Milestone. Trạng thái sẽ là <span className="font-mono text-sm bg-gray-200 px-1 rounded text-gray-700">Pending Admin Check</span>.
                        </li>
                        <li>
                            <strong>Kiểm duyệt định dạng:</strong> Lab Admin sẽ kiểm tra tính hợp lệ của báo cáo (link, file, format).
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-slate-600">
                                <li>Nếu đạt: Chuyển sang cho Company nghiệm thu.</li>
                                <li>Nếu sai quy cách: Trả lại (Reject) để Mentor sửa.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Nghiệm thu chất lượng:</strong> Company có trách nhiệm kiểm tra sản phẩm.
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-slate-600">
                                <li>Nếu <strong className="text-green-600">Chấp nhận (Accept)</strong>: Company cam kết thanh toán khoản tiền tương ứng.</li>
                                <li>Nếu <strong className="text-red-600">Từ chối (Reject)</strong>: Phải cung cấp lý do chính đáng và yêu cầu sửa lỗi.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Tự động duyệt:</strong> Nếu báo cáo đã qua bước Admin Check mà Company không phản hồi trong vòng thời gian quy định, hệ thống có quyền tự động nghiệm thu và yêu cầu thanh toán.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">5</span>
                        Chính sách Tài chính và Thanh toán
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold text-slate-800 mb-2">Cơ chế Thanh toán</h3>
                            <p className="text-sm text-slate-600">Áp dụng mô hình "Nghiệm thu trước - Thanh toán sau". Khi Company bấm "Accept Result", trạng thái là <span className="font-mono text-xs bg-orange-100 text-orange-700 px-1 rounded">Waiting for Payment</span>. Company phải thanh toán ngay để hoàn tất.</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold text-slate-800 mb-2">Nạp / Rút tiền</h3>
                            <p className="text-sm text-slate-600">Rút tiền tối thiểu <strong className="text-slate-900">500,000 VND</strong>. Duyệt thủ công từ 1-3 ngày làm việc. Nạp tiền qua chuyển khoản hoặc cổng thanh toán.</p>
                        </div>
                    </div>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-600 marker:text-blue-500">
                        <li><strong className="text-slate-800">Phí dịch vụ:</strong> Hệ thống sẽ thu một khoản phí nền tảng (Platform Fee) được tính trên giá trị hợp đồng. Mức phí hiển thị rõ ràng trước khi thanh toán.</li>
                        <li><strong className="text-slate-800">Hoàn tiền (Refund):</strong> Tiền thừa trong "Ví dự án" chưa sử dụng sẽ được hoàn trả về "Ví chính" của Company khi dự án Đóng (Closed).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">6</span>
                        Quyền Sở hữu Trí tuệ (IP)
                    </h2>
                    <ul className="list-decimal pl-6 space-y-3 text-slate-600 marker:font-semibold marker:text-slate-500">
                        <li><strong className="text-slate-800">Trước thanh toán:</strong> Sản phẩm (Code, Design, Tài liệu) thuộc quyền sở hữu của Talent/Mentor.</li>
                        <li><strong className="text-slate-800">Sau thanh toán:</strong> Sau khi Company hoàn tất thanh toán cho Milestone/Dự án, toàn bộ quyền sở hữu trí tuệ liên quan đến sản phẩm đó được chuyển giao hoàn toàn cho Company. Talent không được phép bán lại hoặc chia sẻ mã nguồn đó cho bên thứ ba.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">7</span>
                        Giải quyết Tranh chấp và Khiếu nại
                    </h2>
                    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
                        <ul className="list-disc pl-4 space-y-2 text-slate-700">
                            <li><strong>Cơ chế:</strong> Lab Admin sẽ đóng vai trò trọng tài khi xảy ra mâu thuẫn.</li>
                            <li><strong>Thời hạn khiếu nại (Milestone):</strong> Trong thời gian thực hiện hoặc chờ duyệt.</li>
                            <li><strong>Thời hạn khiếu nại (Dự án đã đóng):</strong> Trong vòng <strong className="text-red-600">72 giờ</strong> kể từ khi đóng dự án.</li>
                            <li><strong>Quyết định cuối cùng:</strong> Quyết định của Admin dựa trên bằng chứng là quyết định cuối cùng.</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">8</span>
                            Các hành vi bị nghiêm cấm
                        </h2>
                        <p className="text-slate-600">Cố tình lách luật (Circumvention), xúc phạm trong Chat, đăng tải mã độc, hoặc gian lận thanh toán.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">9</span>
                            Từ chối trách nhiệm
                        </h2>
                        <p className="text-slate-600 text-sm">Lab-ODC là nền tảng kết nối kỹ thuật. Chúng tôi không chịu trách nhiệm về các thỏa thuận riêng lẻ bên ngoài hệ thống hoặc các thiệt hại gián tiếp do lỗi kỹ thuật bất khả kháng.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-blue-200">10</span>
                            Điều khoản sửa đổi
                        </h2>
                        <p className="text-slate-600 text-sm">Chúng tôi có quyền sửa đổi điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng hệ thống đồng nghĩa với việc chấp nhận điều khoản mới.</p>
                    </div>
                </section>

            </main>

            <footer className="bg-slate-50 border-t border-slate-200 p-8 text-center">
                <p className="text-slate-500 text-sm">
                    Mọi thắc mắc về Điều khoản sử dụng, vui lòng liên hệ bộ phận hỗ trợ:<br />
                    <a href="mailto:support@lab-odc.com" className="text-blue-600 font-medium hover:underline mt-1 inline-block">support@lab-odc.com</a>
                    <br />
                </p>
                <p className="text-slate-400 text-xs mt-6">&copy; 2025 Lab-ODC System. All rights reserved.</p>
            </footer>

        </div>
    )
}
