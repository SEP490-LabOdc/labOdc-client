import { useState } from "react";
import { Button } from "../ui/button";

interface InputFileProps {
    label?: string;
    accept?: string;
    placeholder?: string;
    onFileSelected?: (file: File | null) => void;
    onClear?: () => void;
}

export function InputFile({
    label = "Chọn tệp",
    accept = ".xlsx",
    placeholder = "Không có tệp nào được chọn",
    onFileSelected,
    onClear,
}: InputFileProps) {
    const [fileName, setFileName] = useState("");
    const [key, setKey] = useState(Date.now());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        setFileName(file?.name || "");
        onFileSelected?.(file);
    };

    const clearFile = () => {
        setFileName("");
        setKey(Date.now());
        onFileSelected?.(null);
        onClear?.();
    };

    return (
        <div className="w-full space-y-2">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 border rounded-md px-4 py-2 h-10 w-full bg-white">
                    <input
                        key={key}
                        type="file"
                        accept={accept}
                        id="custom-file"
                        onChange={handleChange}
                        className="hidden"
                    />

                    <label
                        htmlFor="custom-file"
                        className="cursor-pointer text-sm font-medium text-primary hover:underline whitespace-nowrap"
                    >
                        {label}
                    </label>

                    <span className="text-sm text-muted-foreground truncate">
                        {fileName || placeholder}
                    </span>
                </div>

                {fileName && (
                    <Button variant="destructive" onClick={clearFile}>
                        Xóa file
                    </Button>
                )}
            </div>
        </div>
    );
}
