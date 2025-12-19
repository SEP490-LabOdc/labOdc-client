import React from 'react'
import { User } from 'lucide-react'

export const EmptyState: React.FC = () => {
    return (
        <tr>
            <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                <div className="flex flex-col items-center gap-2">
                    <User className="h-8 w-8 text-gray-400" />
                    <p>Chưa có thành viên nào trong milestone này</p>
                </div>
            </td>
        </tr>
    )
}