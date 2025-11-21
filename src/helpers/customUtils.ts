// Format tiền tệ VND
export const formatVND = (value: number | string | null | undefined): string => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return '0 VNĐ';

    return new Intl.NumberFormat('vi-VN').format(numberValue) + ' VNĐ';
};

// Format ngày đẹp
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
