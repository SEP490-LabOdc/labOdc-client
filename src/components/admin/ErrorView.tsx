import React from "react"

interface ErrorStateProps {
    title?: string
    description?: string
    details?: string
}

export const ErrorView: React.FC<ErrorStateProps> = ({
    title = "Lỗi Tải Dữ Liệu",
    description = "Không thể kết nối đến server hoặc tải dữ liệu.",
    details,
}) => {
    return (
        <div className="flex h-screen flex-col items-center justify-center p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600">{title}</h2>
            <p className="text-muted-foreground mt-2">{description}</p>
            {details && <p className="text-sm italic mt-1">Chi tiết lỗi: {details}</p>}
        </div>
    )
}
