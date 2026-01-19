import { CURRENCY_SUFFIX } from '@/const'

// Format tiền tệ VND
export const formatVND = (value: number | string | null | undefined): string => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) return `0 ${CURRENCY_SUFFIX}`;

    return new Intl.NumberFormat('vi-VN').format(numberValue) + ` ${CURRENCY_SUFFIX}`;
};