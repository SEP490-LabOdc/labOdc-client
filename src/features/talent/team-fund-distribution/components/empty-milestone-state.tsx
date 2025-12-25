import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Layers } from 'lucide-react'

export const EmptyMilestoneState: React.FC = () => {
    return (
        <Card className="h-full shadow-md rounded-md border-2 border-dashed flex items-center justify-center">
            <CardContent className="py-16">
                <div className="text-center space-y-3">
                    <div className="inline-flex p-4 bg-gray-100 rounded-full">
                        <Layers className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                        Chọn Milestone để bắt đầu
                    </p>
                    <p className="text-sm text-gray-500">
                        Vui lòng chọn một milestone từ danh sách bên trái
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

