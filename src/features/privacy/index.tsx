export default function PrivacyPage() {
    return (
        <div className="max-w-7xl mx-auto my-10 bg-card shadow-xl rounded-2xl overflow-hidden border border-border">

            <header className="bg-primary text-primary-foreground p-10 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 uppercase tracking-wide">Điều Khoản Sử Dụng</h1>
                    <p className="text-primary-foreground/80 text-sm md:text-base font-light">Hệ thống Lab-ODC</p>
                    <div className="mt-4 inline-block bg-primary/80 rounded-full px-4 py-1 text-xs text-primary-foreground/90 border border-primary/60">
                        Ngày cập nhật: 24/12/2025
                    </div>
                </div>
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-primary/50 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-secondary/40 rounded-full opacity-30 blur-2xl"></div>
            </header>

            <main className="p-8 md:p-12 space-y-10">

                <section className="prose max-w-none text-foreground/80">
                    <p className="leading-relaxed">
                        Chào mừng bạn đến với <span className="font-bold text-primary">Lab-ODC</span> (sau đây gọi tắt là "Hệ thống" hoặc "Chúng tôi"). Việc bạn truy cập, đăng ký và sử dụng dịch vụ trên hệ thống đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý tuân thủ toàn bộ các điều khoản dưới đây.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">1</span>
                        Định nghĩa thuật ngữ
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/80 marker:text-primary">
                        <li><strong className="text-foreground">Company (Doanh nghiệp):</strong> Người dùng có nhu cầu đăng dự án, tuyển dụng nhân sự và thanh toán chi phí.</li>
                        <li><strong className="text-foreground">Talent/Mentor (Nhân sự):</strong> Người dùng tham gia thực hiện dự án, bao gồm sinh viên, lập trình viên và người hướng dẫn chuyên môn.</li>
                        <li><strong className="text-foreground">Lab Admin (Quản trị viên):</strong> Đội ngũ vận hành hệ thống, chịu trách nhiệm kiểm duyệt và hỗ trợ giải quyết tranh chấp.</li>
                        <li><strong className="text-foreground">Milestone (Giai đoạn):</strong> Một phần công việc cụ thể của dự án với thời hạn và ngân sách xác định.</li>
                        <li><strong className="text-foreground">Ví hệ thống (Wallet):</strong> Tài khoản điện tử trên hệ thống dùng để lưu trữ, nạp và rút tiền.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">2</span>
                        Tài khoản và Bảo mật
                    </h2>
                    <ul className="list-decimal pl-6 space-y-3 text-foreground/80 marker:font-semibold marker:text-muted-foreground">
                        <li><strong className="text-foreground">Đăng ký:</strong> Bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật (bao gồm email, số điện thoại xác thực OTP, giấy phép kinh doanh đối với Company).</li>
                        <li><strong className="text-foreground">Bảo mật:</strong> Bạn chịu trách nhiệm bảo quản mật khẩu đăng nhập. Mọi hoạt động phát sinh từ tài khoản của bạn sẽ do bạn chịu trách nhiệm hoàn toàn.</li>
                        <li><strong className="text-foreground">Định danh:</strong> Lab-ODC có quyền yêu cầu xác thực danh tính (KYC) hoặc xác thực doanh nghiệp (KYB) trước khi cho phép rút tiền hoặc tạo dự án.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">3</span>
                        Quy định về Dự án và Hợp tác
                    </h2>
                    <ul className="list-decimal pl-6 space-y-3 text-foreground/80 marker:font-semibold marker:text-muted-foreground">
                        <li><strong className="text-foreground">Đăng dự án:</strong> Company chịu trách nhiệm về tính pháp lý và nội dung của dự án đăng tuyển. Không đăng các dự án vi phạm pháp luật hoặc thuần phong mỹ tục.</li>
                        <li><strong className="text-foreground">Ứng tuyển & Cam kết:</strong> Talent/Mentor khi ứng tuyển (Apply) phải đảm bảo có đủ năng lực và thời gian thực hiện. Việc bỏ dở dự án không lý do chính đáng sẽ ảnh hưởng đến điểm uy tín (Rating).</li>
                        <li><strong className="text-foreground">Giới hạn:</strong> Talent chỉ được tham gia tối đa <span className="bg-accent/20 px-1 rounded text-accent-foreground font-semibold">03 dự án</span> active cùng một lúc để đảm bảo chất lượng công việc.</li>
                    </ul>
                </section>

                <section className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                    <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                        <span className="bg-primary text-primary-foreground text-sm font-bold mr-3 px-2.5 py-0.5 rounded">4</span>
                        Quy trình Báo cáo và Nghiệm thu (Quan trọng)
                    </h2>
                    <p className="mb-4 text-sm text-primary/80 italic">Hệ thống áp dụng quy trình kiểm duyệt 2 lớp để đảm bảo chất lượng:</p>
                    <ul className="list-decimal pl-6 space-y-3 text-foreground/90 marker:font-semibold marker:text-primary">
                        <li>
                            <strong>Nộp báo cáo:</strong> Mentor nộp báo cáo tiến độ (Report) khi hoàn thành Milestone. Trạng thái sẽ là <span className="font-mono text-sm bg-muted px-1 rounded text-muted-foreground">Pending Admin Check</span>.
                        </li>
                        <li>
                            <strong>Kiểm duyệt định dạng:</strong> Lab Admin sẽ kiểm tra tính hợp lệ của báo cáo (link, file, format).
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-foreground/70">
                                <li>Nếu đạt: Chuyển sang cho Company nghiệm thu.</li>
                                <li>Nếu sai quy cách: Trả lại (Reject) để Mentor sửa.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Nghiệm thu chất lượng:</strong> Company có trách nhiệm kiểm tra sản phẩm.
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-foreground/70">
                                <li>Nếu <strong className="text-secondary">Chấp nhận (Accept)</strong>: Company cam kết thanh toán khoản tiền tương ứng.</li>
                                <li>Nếu <strong className="text-destructive">Từ chối (Reject)</strong>: Phải cung cấp lý do chính đáng và yêu cầu sửa lỗi.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Tự động duyệt:</strong> Nếu báo cáo đã qua bước Admin Check mà Company không phản hồi trong vòng thời gian quy định, hệ thống có quyền tự động nghiệm thu và yêu cầu thanh toán.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">5</span>
                        Chính sách Tài chính và Thanh toán
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="font-bold text-foreground mb-2">Cơ chế Thanh toán</h3>
                            <p className="text-sm text-foreground/80">Áp dụng mô hình "Nghiệm thu trước - Thanh toán sau". Khi Company bấm "Accept Result", trạng thái là <span className="font-mono text-xs bg-brand-orange/20 text-brand-orange px-1 rounded">Waiting for Payment</span>. Company phải thanh toán ngay để hoàn tất.</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                            <h3 className="font-bold text-foreground mb-2">Nạp / Rút tiền</h3>
                            <p className="text-sm text-foreground/80">Rút tiền tối thiểu <strong className="text-foreground">500,000 VND</strong>. Duyệt thủ công từ 1-3 ngày làm việc. Nạp tiền qua chuyển khoản hoặc cổng thanh toán.</p>
                        </div>
                    </div>
                    <ul className="list-disc pl-6 mt-4 space-y-2 text-foreground/80 marker:text-primary">
                        <li><strong className="text-foreground">Phí dịch vụ:</strong> Hệ thống sẽ thu một khoản phí nền tảng (Platform Fee) được tính trên giá trị hợp đồng. Mức phí hiển thị rõ ràng trước khi thanh toán.</li>
                        <li><strong className="text-foreground">Hoàn tiền (Refund):</strong> Tiền thừa trong "Ví dự án" chưa sử dụng sẽ được hoàn trả về "Ví chính" của Company khi dự án Đóng (Closed).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">6</span>
                        Quyền Sở hữu Trí tuệ (IP)
                    </h2>
                    <ul className="list-decimal pl-6 space-y-3 text-foreground/80 marker:font-semibold marker:text-muted-foreground">
                        <li><strong className="text-foreground">Trước thanh toán:</strong> Sản phẩm (Code, Design, Tài liệu) thuộc quyền sở hữu của Talent/Mentor.</li>
                        <li><strong className="text-foreground">Sau thanh toán:</strong> Sau khi Company hoàn tất thanh toán cho Milestone/Dự án, toàn bộ quyền sở hữu trí tuệ liên quan đến sản phẩm đó được chuyển giao hoàn toàn cho Company. Talent không được phép bán lại hoặc chia sẻ mã nguồn đó cho bên thứ ba.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">7</span>
                        Giải quyết Tranh chấp và Khiếu nại
                    </h2>
                    <div className="border-l-4 border-accent bg-accent/10 p-4 rounded-r-lg">
                        <ul className="list-disc pl-4 space-y-2 text-foreground/90">
                            <li><strong>Cơ chế:</strong> Lab Admin sẽ đóng vai trò trọng tài khi xảy ra mâu thuẫn.</li>
                            <li><strong>Thời hạn khiếu nại (Milestone):</strong> Trong thời gian thực hiện hoặc chờ duyệt.</li>
                            <li><strong>Thời hạn khiếu nại (Dự án đã đóng):</strong> Trong vòng <strong className="text-destructive">72 giờ</strong> kể từ khi đóng dự án.</li>
                            <li><strong>Quyết định cuối cùng:</strong> Quyết định của Admin dựa trên bằng chứng là quyết định cuối cùng.</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-foreground mb-2 flex items-center">
                            <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">8</span>
                            Các hành vi bị nghiêm cấm
                        </h2>
                        <p className="text-foreground/80">Cố tình lách luật (Circumvention), xúc phạm trong Chat, đăng tải mã độc, hoặc gian lận thanh toán.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-foreground mb-2 flex items-center">
                            <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">9</span>
                            Từ chối trách nhiệm
                        </h2>
                        <p className="text-foreground/80 text-sm">Lab-ODC là nền tảng kết nối kỹ thuật. Chúng tôi không chịu trách nhiệm về các thỏa thuận riêng lẻ bên ngoài hệ thống hoặc các thiệt hại gián tiếp do lỗi kỹ thuật bất khả kháng.</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-foreground mb-2 flex items-center">
                            <span className="bg-primary/10 text-primary text-sm font-bold mr-3 px-2.5 py-0.5 rounded border border-primary/20">10</span>
                            Điều khoản sửa đổi
                        </h2>
                        <p className="text-foreground/80 text-sm">Chúng tôi có quyền sửa đổi điều khoản này bất cứ lúc nào. Việc tiếp tục sử dụng hệ thống đồng nghĩa với việc chấp nhận điều khoản mới.</p>
                    </div>
                </section>

            </main>

            <footer className="bg-muted border-t border-border p-8 text-center">
                <p className="text-muted-foreground text-sm">
                    Mọi thắc mắc về Điều khoản sử dụng, vui lòng liên hệ bộ phận hỗ trợ:<br />
                    <a href="mailto:support@lab-odc.com" className="text-primary font-medium hover:underline mt-1 inline-block">support@lab-odc.com</a>
                    <br />
                </p>
                <p className="text-muted-foreground/60 text-xs mt-6">&copy; 2025 Lab-ODC System. All rights reserved.</p>
            </footer>

        </div>
    )
}
