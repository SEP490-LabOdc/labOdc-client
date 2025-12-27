import React, { useRef, useState } from "react";
import { X, Loader2, Eye, RotateCcw, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadFile } from "@/hooks/api/file";

interface ImageUploadProps {
    value?: string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    maxSize?: number; // MB
    disabled?: boolean;
    className?: string;
}

export function ImageUpload({
    value,
    onChange,
    placeholder = "Chọn ảnh để tải lên",
    maxSize = 5,
    disabled = false,
    className
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string>("");
    const [isDragOver, setIsDragOver] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
    const allowedTypes = [".jpg", ".jpeg", ".png", ".webp"];

    const handleSelectFile = async (file: File) => {
        setUploadError("");

        // Validate type
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        if (!allowedTypes.includes(ext)) {
            setUploadError("Chỉ cho phép JPG, JPEG, PNG, WEBP");
            return;
        }

        // Validate size
        if (file.size > maxSize * 1024 * 1024) {
            setUploadError(`Dung lượng ảnh không vượt quá ${maxSize}MB`);
            return;
        }

        // Preview ngay
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        // Lấy tỷ lệ ảnh gốc
        const img = new Image();
        img.onload = () => {
            setAspectRatio(img.width / img.height);
        };
        img.src = localPreview;

        // Upload lên server
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await uploadFile(formData);
            const { fileUrl } = res.data || {};

            if (fileUrl) {
                onChange(fileUrl);
            } else {
                setUploadError("Không thể lấy URL ảnh từ server");
            }
        } catch (e: any) {
            setUploadError(e.message || "Tải ảnh thất bại");
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const file = e.dataTransfer.files?.[0];
        if (file) handleSelectFile(file);
    };

    const handleClick = () => fileInputRef.current?.click();

    const handleRemove = () => {
        setPreview(null);
        setAspectRatio(null);
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const imageToShow = value || preview;

    return (
        <div className={cn("w-full", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpg,image/jpeg,image/webp"
                className="hidden"
                disabled={disabled}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleSelectFile(file);
                }}
            />

            {!imageToShow ? (
                <div
                    onClick={!isUploading ? handleClick : undefined}
                    onDrop={!isUploading ? handleDrop : undefined}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    className={cn(
                        "border-2 border-dashed rounded-md p-6 text-center transition-colors",
                        !isUploading && "cursor-pointer",
                        isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300",
                        disabled && "opacity-50 cursor-not-allowed",
                        uploadError && "border-red-400 bg-red-50"
                    )}
                >
                    {isUploading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
                    ) : (
                        <ImageIcon className="h-10 w-10 text-gray-400 mx-auto" />
                    )}

                    <p className="text-sm mt-3">
                        {isUploading ? "Đang tải lên..." : placeholder}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Kéo & thả ảnh vào đây</p>
                    <p className="text-xs text-gray-400 mt-1">
                        Hỗ trợ: JPG, JPEG, PNG, WEBP • Tối đa {maxSize}MB
                    </p>
                </div>
            ) : (
                <div
                    className="relative border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center"
                    style={{
                        aspectRatio: aspectRatio ? `${aspectRatio}` : "1/1",
                        maxHeight: "350px", // giới hạn kích thước hiển thị tối đa
                    }}
                >
                    {/* Hiển thị ảnh theo đúng tỷ lệ, không crop */}
                    <img
                        src={imageToShow}
                        alt="Uploaded"
                        className="object-contain"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%", // đảm bảo không vượt quá container
                        }}
                    />

                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(imageToShow, "_blank")}
                            className="h-8 w-8 p-0 bg-white/70 hover:bg-white"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClick}
                            className="h-8 w-8 p-0 bg-white/70 hover:bg-white"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRemove}
                            className="h-8 w-8 p-0 bg-white/70 hover:bg-white"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Loading overlay */}
                    {isUploading && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        </div>
                    )}
                </div>
            )}

            {uploadError && (
                <p className="text-sm text-red-600 mt-2">{uploadError}</p>
            )}
        </div>
    );
}
