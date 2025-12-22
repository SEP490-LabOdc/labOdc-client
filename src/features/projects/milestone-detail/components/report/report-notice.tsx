import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'

export const ReportNotice: React.FC = () => {
    return (
        <Alert className="mb-4 border-yellow-200 bg-yellow-50 text-yellow-900">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="font-semibold text-yellow-900">
                Lưu ý quan trọng
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm text-yellow-800">
                <p className="mb-3">
                    Bạn cần nộp báo cáo theo đúng mẫu của hệ thống để đảm bảo quá trình nghiệm thu được diễn ra thuận lợi.
                    <strong className='ml-2'>Nhấn nút "Mẫu báo cáo" để xem mẫu báo cáo.</strong>
                </p>
            </AlertDescription>
        </Alert>
    )
}

