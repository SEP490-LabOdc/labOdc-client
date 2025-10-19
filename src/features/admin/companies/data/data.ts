import type { CompanyStatus } from "./schema";

export const callTypes = new Map<CompanyStatus, string>([
    ['ACTIVE', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['UPDATE_REQUIRED', 'bg-neutral-300/40 border-neutral-300'],
    ['PENDING', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    ['DISABLED', 'bg-red-400/30 text-red-900 dark:bg-red-700/50 dark:text-red-100 border-red-500'],
])

export const STATUS_OPTIONS = [
    { label: 'Chờ xác thực', value: 'PENDING' },
    { label: 'Yêu cầu cập nhật', value: 'UPDATE_REQUIRED' },
    { label: 'Đang hoạt động', value: 'ACTIVE' },
    { label: 'Vô hiệu hóa', value: 'DISABLED' },
]

export const DOMAIN_OPTIONS = [
    // 🧠 Công nghệ & Kỹ thuật số
    { label: 'Công nghệ thông tin', value: 'Công nghệ thông tin' },
    { label: 'Phát triển phần mềm', value: 'Phát triển phần mềm' },
    { label: 'Thiết kế website và ứng dụng', value: 'Thiết kế website và ứng dụng' },
    { label: 'Trí tuệ nhân tạo và máy học (AI/ML)', value: 'Trí tuệ nhân tạo và máy học (AI/ML)' },
    { label: 'Phân tích dữ liệu và Big Data', value: 'Phân tích dữ liệu và Big Data' },
    { label: 'An ninh mạng', value: 'An ninh mạng' },
    { label: 'Internet of Things (IoT)', value: 'Internet of Things (IoT)' },
    { label: 'Blockchain', value: 'Blockchain' },
    { label: 'Điện toán đám mây (Cloud Computing)', value: 'Điện toán đám mây (Cloud Computing)' },
    { label: 'Chuyển đổi số', value: 'Chuyển đổi số' },
    { label: 'Công nghệ tài chính (Fintech)', value: 'Công nghệ tài chính (Fintech)' },
    { label: 'Công nghệ giáo dục (EdTech)', value: 'Công nghệ giáo dục (EdTech)' },
    { label: 'Công nghệ y tế (HealthTech)', value: 'Công nghệ y tế (HealthTech)' },
    { label: 'Công nghệ bất động sản (PropTech)', value: 'Công nghệ bất động sản (PropTech)' },
    { label: 'Phần mềm dịch vụ (SaaS)', value: 'Phần mềm dịch vụ (SaaS)' },

    // 📢 Marketing & Truyền thông
    { label: 'Tiếp thị số (Digital Marketing)', value: 'Tiếp thị số (Digital Marketing)' },
    { label: 'Quảng cáo và truyền thông', value: 'Quảng cáo và truyền thông' },
    { label: 'Sản xuất nội dung và thiết kế', value: 'Sản xuất nội dung và thiết kế' },
    { label: 'Tổ chức sự kiện và quan hệ công chúng', value: 'Tổ chức sự kiện và quan hệ công chúng' },

    // 🏭 Sản xuất & Công nghiệp
    { label: 'Sản xuất công nghiệp', value: 'Sản xuất công nghiệp' },
    { label: 'Cơ khí và tự động hóa', value: 'Cơ khí và tự động hóa' },
    { label: 'Năng lượng và môi trường', value: 'Năng lượng và môi trường' },
    { label: 'Dệt may và thời trang', value: 'Dệt may và thời trang' },
    { label: 'Thực phẩm và đồ uống', value: 'Thực phẩm và đồ uống' },
    { label: 'In ấn và bao bì', value: 'In ấn và bao bì' },
    { label: 'Vật liệu xây dựng', value: 'Vật liệu xây dựng' },

    // 🧾 Dịch vụ & Thương mại
    { label: 'Thương mại điện tử (E-commerce)', value: 'Thương mại điện tử (E-commerce)' },
    { label: 'Xuất nhập khẩu và phân phối', value: 'Xuất nhập khẩu và phân phối' },
    { label: 'Bán lẻ và chuỗi cửa hàng', value: 'Bán lẻ và chuỗi cửa hàng' },
    { label: 'Logistics và vận tải', value: 'Logistics và vận tải' },
    { label: 'Ngân hàng và tài chính', value: 'Ngân hàng và tài chính' },
    { label: 'Kế toán và kiểm toán', value: 'Kế toán và kiểm toán' },
    { label: 'Tư vấn pháp lý', value: 'Tư vấn pháp lý' },
    { label: 'Bảo hiểm', value: 'Bảo hiểm' },
    { label: 'Bất động sản', value: 'Bất động sản' },

    // 🎓 Giáo dục & Đào tạo
    { label: 'Giáo dục và đào tạo', value: 'Giáo dục và đào tạo' },
    { label: 'Đào tạo kỹ năng số', value: 'Đào tạo kỹ năng số' },
    { label: 'Tư vấn du học', value: 'Tư vấn du học' },

    // ⚕️ Y tế & Sức khỏe
    { label: 'Y tế và chăm sóc sức khỏe', value: 'Y tế và chăm sóc sức khỏe' },
    { label: 'Dược phẩm và thiết bị y tế', value: 'Dược phẩm và thiết bị y tế' },
    { label: 'Spa và thẩm mỹ', value: 'Spa và thẩm mỹ' },

    // 🏗️ Xây dựng & Kiến trúc
    { label: 'Xây dựng và thi công', value: 'Xây dựng và thi công' },
    { label: 'Kiến trúc và thiết kế nội thất', value: 'Kiến trúc và thiết kế nội thất' },

    // 🚗 Du lịch & Dịch vụ
    { label: 'Du lịch và lữ hành', value: 'Du lịch và lữ hành' },
    { label: 'Khách sạn và lưu trú', value: 'Khách sạn và lưu trú' },
    { label: 'Nhà hàng và ẩm thực (F&B)', value: 'Nhà hàng và ẩm thực (F&B)' },
    { label: 'Vận tải hành khách và taxi công nghệ', value: 'Vận tải hành khách và taxi công nghệ' },

    // 🌿 Nông nghiệp & Môi trường
    { label: 'Nông nghiệp công nghệ cao', value: 'Nông nghiệp công nghệ cao' },
    { label: 'Thực phẩm sạch và organic', value: 'Thực phẩm sạch và organic' },
    { label: 'Xử lý môi trường và tái chế', value: 'Xử lý môi trường và tái chế' },

    // 🎨 Nghệ thuật & Giải trí
    { label: 'Thiết kế đồ họa và sáng tạo', value: 'Thiết kế đồ họa và sáng tạo' },
    { label: 'Nhiếp ảnh và studio', value: 'Nhiếp ảnh và studio' },
    { label: 'Âm nhạc, phim ảnh và truyền hình', value: 'Âm nhạc, phim ảnh và truyền hình' },
    { label: 'Trò chơi và giải trí (Gaming)', value: 'Trò chơi và giải trí (Gaming)' },
]