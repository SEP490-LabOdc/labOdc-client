import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import {
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    Sparkles,
    TrendingUp,
    TrendingDown,
    ExternalLink,
    AlertTriangle,
} from 'lucide-react'
import { type Candidate } from '../schema'
import { getCandidateStatusColor, getCandidateStatusLabel } from '@/lib/utils'
import { formatDateLongWithTime } from '@/helpers/datetime'

interface CandidateDetailModalProps {
    isOpen: boolean
    onClose: () => void
    candidate: Candidate | null
    onApprove?: () => void
    onReject?: () => void
}

/**
 * Circular Progress Component for Match Score
 */
const CircularProgress: React.FC<{ value: number; size?: number }> = ({
    value,
    size = 120,
}) => {
    const radius = (size - 20) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (value / 100) * circumference

    const getColor = (score: number) => {
        if (score >= 80) return 'text-green-600 stroke-green-600'
        if (score >= 60) return 'text-yellow-600 stroke-yellow-600'
        return 'text-red-600 stroke-red-600'
    }

    return (
        <div
            className="relative inline-flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg
                className="transform -rotate-90"
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={getColor(value)}
                    style={{
                        transition: 'stroke-dashoffset 0.5s ease-in-out',
                    }}
                />
            </svg>
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getColor(value)}`}>
                    {value}%
                </span>
            </div>
        </div>
    )
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
    isOpen,
    onClose,
    candidate,
    onApprove,
    onReject,
}) => {
    if (!candidate) return null

    const status = candidate.status
    const aiScanResult = candidate.aiScanResult


    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
                                {candidate.name}
                            </DialogTitle>
                            <div className="flex items-center gap-3 flex-wrap">
                                <Badge
                                    className={`${getCandidateStatusColor(status)} rounded-full border px-3 py-1`}
                                >
                                    {status === 'PENDING' && <Clock className="h-3 w-3 mr-1" />}
                                    {status === 'APPROVED' && (
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                    )}
                                    {status === 'REJECTED' && <XCircle className="h-3 w-3 mr-1" />}
                                    {getCandidateStatusLabel(status)}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                    Ứng tuyển: {formatDateLongWithTime(candidate.appliedAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {/* Section 1: Basic Info & CV */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <label className="text-sm font-medium text-gray-700">
                                CV/Resume
                            </label>
                            <Button
                                variant="outline"
                                onClick={() => window.open(candidate.cvUrl, '_blank')}
                                className="shrink-0"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Xem CV/Resume
                                <ExternalLink className="h-3 w-3 ml-2" />
                            </Button>
                        </div>

                        {aiScanResult && !aiScanResult.isCv && (
                            <Alert className="border-yellow-200 bg-yellow-50">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                <AlertDescription className="text-sm text-yellow-800">
                                    <strong>Cảnh báo:</strong> File đã tải lên có thể không phải
                                    là CV hợp lệ.
                                    {aiScanResult.reason && (
                                        <p className="mt-1 italic">{aiScanResult.reason}</p>
                                    )}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Section 2: AI Insights */}
                    {aiScanResult ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-600" />
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Phân tích AI
                                </h2>
                            </div>
                            {/* Summary */}
                            {aiScanResult.summary && (
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                                        Tóm tắt
                                    </h3>
                                    <div className="p-4 bg-white rounded-md border border-slate-200">
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {aiScanResult.summary}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Pros & Cons - 2 Column Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Pros */}
                                {aiScanResult.pros && aiScanResult.pros.length > 0 && (
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-green-600" />
                                            Điểm mạnh
                                        </h3>
                                        <div className="space-y-2">
                                            {aiScanResult.pros.map((pro, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 p-3 bg-white rounded-md border border-green-200"
                                                >
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                                                    <p className="text-sm text-gray-700 flex-1">
                                                        {pro}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Cons */}
                                {aiScanResult.cons && aiScanResult.cons.length > 0 && (
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <TrendingDown className="h-5 w-5 text-red-600" />
                                            Điểm cần cải thiện
                                        </h3>
                                        <div className="space-y-2">
                                            {aiScanResult.cons.map((con, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 p-3 bg-white rounded-md border border-red-200"
                                                >
                                                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                                                    <p className="text-sm text-gray-700 flex-1">
                                                        {con}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Match Score with Circular Progress */}
                            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-md border border-slate-200">
                                <div className="shrink-0">
                                    <CircularProgress
                                        value={aiScanResult.matchScore}
                                        size={120}
                                    />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Điểm Khớp
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Mức độ phù hợp của ứng viên với yêu cầu dự án
                                    </p>
                                    {/* Linear Progress Bar as additional visual */}
                                    <div className="space-y-2">
                                        <Progress
                                            value={aiScanResult.matchScore}
                                            className="h-2"
                                        />
                                        <p className="text-xs text-gray-500">
                                            {aiScanResult.matchScore >= 80 && 'Rất phù hợp'}
                                            {aiScanResult.matchScore >= 60 &&
                                                aiScanResult.matchScore < 80 &&
                                                'Khá phù hợp'}
                                            {aiScanResult.matchScore < 60 && 'Cần xem xét thêm'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Is CV Check */}
                            <div className="flex items-start gap-3 p-4 rounded-md bg-white border border-slate-200">
                                <div
                                    className={`p-2 rounded-full ${aiScanResult.isCv ? 'bg-green-100' : 'bg-red-100'
                                        }`}
                                >
                                    {aiScanResult.isCv ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-700 block mb-1">
                                        Xác nhận CV
                                    </label>
                                    <p className="text-sm text-gray-600">
                                        {aiScanResult.isCv
                                            ? 'Đây là một CV hợp lệ'
                                            : 'Không phải CV hợp lệ'}
                                    </p>
                                    {aiScanResult.reason && (
                                        <p className="text-xs text-gray-500 mt-1 italic">
                                            {aiScanResult.reason}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center">
                            <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">
                                Chưa có kết quả phân tích AI cho đơn ứng tuyển này
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer with Action Buttons */}
                {(onApprove || onReject) && (
                    <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
                        {onReject && (
                            <Button
                                variant="outline"
                                onClick={onReject}
                                className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Từ chối
                            </Button>
                        )}
                        {onApprove && (
                            <Button
                                onClick={onApprove}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Duyệt
                            </Button>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
