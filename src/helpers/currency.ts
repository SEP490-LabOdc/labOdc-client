// Format tiền tệ VND
export const formatVND = (value: number | string | null | undefined): string => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return '0 VNĐ';

    return new Intl.NumberFormat('vi-VN').format(numberValue) + ' VNĐ';
};