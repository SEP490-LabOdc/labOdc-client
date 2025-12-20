

// Format ngày đẹp (có cả giờ)
export const formatDate = (dateStr: string | Date | null | undefined): string => {
    if (!dateStr) return 'Không xác định';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Không hợp lệ';

    return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Format ngày (chỉ ngày, không có giờ)
export const formatDateOnly = (dateStr: string | Date | null | undefined): string => {
    if (!dateStr) return '-';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

// Format ngày với tên tháng đầy đủ (không có giờ)
export const formatDateLong = (dateStr: string | Date | null | undefined): string => {
    if (!dateStr) return '-';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Format ngày với tên tháng đầy đủ và có giờ
export const formatDateLongWithTime = (dateStr: string | Date | null | undefined): string => {
    if (!dateStr) return '-';

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '-';

    return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Tính số ngày làm việc
export const calculateDays = (startDate: string | Date | null | undefined): string => {
    if (!startDate) return 'Không xác định';

    const start = new Date(startDate);
    if (isNaN(start.getTime())) return 'Không hợp lệ';

    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return `${diffDays} ngày`;
};
