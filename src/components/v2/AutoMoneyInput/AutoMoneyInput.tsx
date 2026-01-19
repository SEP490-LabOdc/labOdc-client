import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AutoMoneyInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: number | string;
    onChange?: (value: number) => void;
    onValueChange?: (formattedValue: string) => void;
    min?: number;
    max?: number;
    allowNegative?: boolean;
    suffix?: string;
    className?: string;
}

export function AutoMoneyInput({
    value = "",
    onChange,
    onValueChange,
    min,
    max,
    allowNegative = false,
    suffix,
    className,
    ...props
}: AutoMoneyInputProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Format số với dấu chấm ngăn cách hàng nghìn (VND format)
    const formatNumber = (num: number | string): string => {
        if (num === null || num === undefined || num === "") return "";

        const numStr = num.toString().replace(/[^\d-]/g, "");
        if (!numStr || numStr === "-") return numStr;

        const numericValue = allowNegative ? numStr : numStr.replace(/-/g, "");
        if (!numericValue) return "";

        // Thêm dấu chấm ngăn cách hàng nghìn
        const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return allowNegative && numStr.startsWith("-") ? `-${formatted}` : formatted;
    };

    // Chuyển formatted string về số
    const parseNumber = (str: string): number => {
        const cleaned = str.replace(/[^\d-]/g, "");
        if (!cleaned || cleaned === "-") return 0;
        const num = parseInt(cleaned, 10);
        return isNaN(num) ? 0 : num;
    };

    // Lấy giá trị hiển thị
    const getDisplayValue = (): string => {
        if (value === null || value === undefined || value === "") return "";

        const numValue = typeof value === "string" ? parseNumber(value) : value;
        return formatNumber(numValue);
    };

    // Tính toán vị trí cursor mới sau khi format
    const getNewCursorPosition = (
        oldValue: string,
        newValue: string,
        oldCursorPosition: number
    ): number => {
        // Đếm số chữ số trước cursor ở giá trị cũ (không tính dấu chấm)
        const digitsBeforeCursor = oldValue
            .substring(0, oldCursorPosition)
            .replace(/[^\d]/g, "").length;

        if (digitsBeforeCursor === 0) return oldCursorPosition;

        // Tìm vị trí trong giá trị mới tương ứng với số chữ số đã đếm
        let digitCount = 0;
        for (let i = 0; i < newValue.length; i++) {
            if (/\d/.test(newValue[i])) {
                digitCount++;
                if (digitCount === digitsBeforeCursor) {
                    // Trả về vị trí sau chữ số cuối cùng
                    return i + 1;
                }
            }
        }

        // Nếu không tìm thấy, trả về cuối chuỗi
        return newValue.length;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const oldValue = input.value.replace(suffix ? ` ${suffix}` : "", "").trim();
        const oldCursorPosition = input.selectionStart || 0;

        // Lấy giá trị thô (chỉ số)
        let rawValue = input.value;

        // Xóa suffix nếu có
        if (suffix) {
            rawValue = rawValue.replace(new RegExp(`\\s*${suffix}\\s*`, "g"), "");
        }

        // Xóa tất cả ký tự không phải số (và dấu trừ nếu cho phép)
        if (allowNegative) {
            rawValue = rawValue.replace(/[^\d-]/g, "");
            // Đảm bảo chỉ có một dấu trừ ở đầu
            if (rawValue.includes("-")) {
                rawValue = "-" + rawValue.replace(/-/g, "");
            }
        } else {
            rawValue = rawValue.replace(/\D/g, "");
        }

        // Parse thành số
        let numericValue = parseNumber(rawValue);

        // Áp dụng min/max
        if (typeof min === "number" && numericValue < min) {
            numericValue = min;
        }
        if (typeof max === "number" && numericValue > max) {
            numericValue = max;
        }

        // Format lại
        const formattedValue = formatNumber(numericValue);

        // Cập nhật giá trị
        onChange?.(numericValue);
        onValueChange?.(formattedValue);

        // Giữ nguyên cursor position
        requestAnimationFrame(() => {
            if (inputRef.current) {
                // Tính vị trí cursor chỉ dựa trên phần số (không tính suffix)
                const newCursorPosition = getNewCursorPosition(
                    oldValue,
                    formattedValue,
                    oldCursorPosition
                );
                // Cursor position không vượt quá độ dài phần số đã format
                const adjustedPosition = Math.min(newCursorPosition, formattedValue.length);

                inputRef.current.setSelectionRange(adjustedPosition, adjustedPosition);
            }
        });
    };

    const displayValue = getDisplayValue();
    const finalDisplayValue = suffix ? `${displayValue} ${suffix}` : displayValue;

    return (
        <Input
            {...props}
            ref={inputRef}
            value={finalDisplayValue}
            onChange={handleChange}
            inputMode="numeric"
            className={cn(className)}
            placeholder={props.placeholder || "Nhập số tiền"}
        />
    );
}