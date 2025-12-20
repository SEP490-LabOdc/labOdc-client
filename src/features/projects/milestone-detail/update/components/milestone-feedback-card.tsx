import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, FileText, Download } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { formatDate } from '@/helpers/datetime'
import type { MilestoneFeedback } from '@/hooks/api/milestones/types'

interface MilestoneFeedbackCardProps {
    feedback: MilestoneFeedback[] | undefined
    isLoading: boolean
}

export const MilestoneFeedbackCard: React.FC<MilestoneFeedbackCardProps> = ({
    feedback,
    isLoading,
}) => {
    if (isLoading) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <Spinner />
                </CardContent>
            </Card>
        )
    }

    if (!feedback) {
        return null
    }

    return (
        <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="h-5 w-5" />
                    Phản hồi từ Doanh nghiệp
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {feedback.map((feedback: MilestoneFeedback) => (
                    <>
                        <div className="bg-white p-4 rounded-lg border border-orange-200">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                {feedback.content}
                            </p>
                        </div>

                        {feedback.attachments && feedback.attachments.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Tài liệu đính kèm:</h4>
                                <div className="space-y-2">
                                    {feedback.attachments.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-orange-200 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-8 h-8 text-orange-500" />
                                                <div>
                                                    <p className="text-sm font-medium">{file.name}</p>
                                                    <p className="text-xs text-gray-400">
                                                        {formatDate(feedback.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => window.open(file.url, '_blank')}
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <p className="text-xs text-gray-600">
                            Ngày phản hồi: {formatDate(feedback.createdAt)}
                        </p>
                    </>
                ))}
            </CardContent>
        </Card>
    )
}