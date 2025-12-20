import React from 'react'

export const DistributionTableHeader: React.FC = () => {
    return (
        <thead className="bg-gray-50 border-b">
            <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Thành viên
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Số tiền phân bổ
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tỷ lệ
                </th>
            </tr>
        </thead>
    )
}