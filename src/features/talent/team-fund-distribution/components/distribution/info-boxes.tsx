import React from 'react'

export const InfoBoxes: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">
                    <strong>Gợi ý:</strong> Nhấn Tab để di chuyển nhanh giữa các ô nhập liệu
                </p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                    ✓ <strong>Lưu ý:</strong> Tổng phân bổ phải bằng hoặc nhỏ hơn tổng quỹ
                </p>
            </div>
        </div>
    )
}