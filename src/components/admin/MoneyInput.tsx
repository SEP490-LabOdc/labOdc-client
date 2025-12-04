import * as React from "react";
import { Input } from "@/components/ui/input";

interface MoneyInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
}

export function MoneyInput({ value = 0, onChange, min, max, ...props }: MoneyInputProps) {
    const formatVND = (num: number | string): string => {
        if (num === null || num === undefined) return "";
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const displayValue = formatVND(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        let numericValue = raw ? Number(raw) : 0;

        if (typeof min === "number" && numericValue < min) {
            numericValue = min;
        }
        if (typeof max === "number" && numericValue > max) {
            numericValue = max;
        }

        onChange?.(numericValue);
    };

    return (
        <Input
            {...props}
            value={displayValue}
            min={-1}
            onChange={handleChange}
            inputMode="numeric"
        />
    );
}
