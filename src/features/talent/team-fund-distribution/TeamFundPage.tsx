import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Wallet,
    TrendingUp,
    CheckCircle,
    AlertTriangle,
    XCircle,
    DollarSign,
    Clock,
    Users,
    ArrowRight,
    Layers
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { DistributionTable } from './components'
import {
    formatVND,
    calculateTeamFundSummary,
    MOCK_TEAM_MEMBERS,
    MOCK_MILESTONE_FUNDS,
    getOpenMilestones
} from './finance.types'

export const TeamFundPage: React.FC = () => {
    // State Management
    const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('')
    const [allocations, setAllocations] = useState<Record<string, number>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Data
    const members = MOCK_TEAM_MEMBERS
    const milestones = MOCK_MILESTONE_FUNDS
    const currentUserId = 'tm-001' // Leader ID (mock)

    // Get open milestones only
    const openMilestones = getOpenMilestones(milestones)

    // Calculate summary stats
    const summary = calculateTeamFundSummary(milestones, members)

    // Get selected milestone
    const selectedMilestone = milestones.find(m => m.id === selectedMilestoneId)

    // Calculate allocations
    const totalAllocated = useMemo(() => {
        return Object.values(allocations).reduce((sum, amount) => sum + amount, 0)
    }, [allocations])

    const remaining = selectedMilestone
        ? selectedMilestone.remainingAmount - totalAllocated
        : 0

    const canSubmit = selectedMilestone && remaining >= 0 && totalAllocated > 0

    // Handlers
    const handleMilestoneChange = (milestoneId: string) => {
        setSelectedMilestoneId(milestoneId)
        setAllocations({}) // Reset allocations when changing milestone
    }

    const handleAllocationChange = (memberId: string, amount: number) => {
        setAllocations(prev => ({
            ...prev,
            [memberId]: amount
        }))
    }

    const handleConfirmDistribution = async () => {
        if (!canSubmit) return

        setIsSubmitting(true)
        try {
            // TODO: Call API to submit distribution
            console.log('Distribution:', {
                milestoneId: selectedMilestoneId,
                allocations,
                totalAmount: totalAllocated
            })

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            toast.success(`Đã phân bổ thành công ${formatVND(totalAllocated)}`)

            // Reset state
            setAllocations({})
            setSelectedMilestoneId('')
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
            console.error('Distribution error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="overflow-hidden">
            <div className="h-full p-4">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Wallet className="h-8 w-8 text-[#2a9d8f]" />
                        Quản lý Quỹ Nhóm
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Phân bổ và quản lý nguồn tiền cho các thành viên trong nhóm
                    </p>
                </div>

                {/* Master-Detail Layout */}
                <div className="grid grid-cols-12 gap-6 h-[calc(100%-80px)]">
                    {/* LEFT COLUMN - Master (Sidebar) */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
                        {/* Summary Cards - Compact */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Total Held Amount Card */}
                            <Card className="border-2 border-indigo-200 shadow-md rounded-lg overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 text-white">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Wallet className="h-4 w-4" />
                                            <p className="text-xs font-medium">Đang Giữ</p>
                                        </div>
                                        <p className="text-xl font-bold">
                                            {formatVND(summary.remainingInHolding)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Lifetime Distributed Card */}
                            <Card className="border-2 border-green-200 shadow-md rounded-lg overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 text-white">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <TrendingUp className="h-4 w-4" />
                                            <p className="text-xs font-medium">Đã Chia</p>
                                        </div>
                                        <p className="text-xl font-bold">
                                            {formatVND(summary.totalDistributed)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Milestone List */}
                        <Card className="flex-1 shadow-md rounded-lg border-2 overflow-hidden flex flex-col">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Layers className="h-5 w-5 text-[#2a9d8f]" />
                                    Milestones ({openMilestones.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-hidden p-0">
                                <ScrollArea className="h-full">
                                    <div className="p-4 space-y-2">
                                        {openMilestones.length > 0 ? (
                                            openMilestones.map((milestone) => {
                                                const isSelected = milestone.id === selectedMilestoneId

                                                return (
                                                    <button
                                                        key={milestone.id}
                                                        onClick={() => handleMilestoneChange(milestone.id)}
                                                        className={cn(
                                                            "w-full text-left p-4 rounded-lg border-2 transition-all",
                                                            "hover:shadow-md hover:border-[#2a9d8f]/50",
                                                            isSelected
                                                                ? "border-indigo-500 bg-indigo-50 shadow-md"
                                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                                        )}
                                                    >
                                                        <div className="space-y-2">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <p className={cn(
                                                                    "font-semibold text-sm line-clamp-2",
                                                                    isSelected ? "text-indigo-900" : "text-gray-900"
                                                                )}>
                                                                    {milestone.title}
                                                                </p>
                                                                {isSelected && (
                                                                    <Badge className="bg-indigo-500 text-white flex-shrink-0">
                                                                        Đang chọn
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                                                    {formatVND(milestone.remainingAmount)}
                                                                </Badge>
                                                                <span className="text-xs text-gray-500">
                                                                    Còn lại
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                <Clock className="h-3 w-3" />
                                                                <span>
                                                                    {new Date(milestone.releasedAt).toLocaleDateString('vi-VN')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                )
                                            })
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <p className="text-sm">Không có milestone nào đang mở</p>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN - Detail (Work Area) */}
                    <div className="col-span-12 lg:col-span-8 h-full">
                        {selectedMilestone ? (
                            <Card className="h-full shadow-lg rounded-lg border-2 flex flex-col overflow-hidden">
                                {/* Card Header */}
                                <CardHeader className="border-b bg-white">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Users className="h-5 w-5 text-[#2a9d8f]" />
                                        {selectedMilestone.title}
                                    </CardTitle>
                                    <CardDescription className="mt-1">
                                        {selectedMilestone.description}
                                    </CardDescription>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge className="bg-green-100 text-green-800 border-green-300">
                                            <DollarSign className="h-3 w-3 mr-1" />
                                            Khả dụng: {formatVND(selectedMilestone.remainingAmount)}
                                        </Badge>
                                        <Badge variant="outline" className="text-gray-600">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {new Date(selectedMilestone.releasedAt).toLocaleDateString('vi-VN')}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                {/* Card Body - Scrollable Table */}
                                <CardContent className="flex-1 overflow-y-auto p-6">
                                    <DistributionTable
                                        members={members}
                                        totalFund={selectedMilestone.remainingAmount}
                                        allocations={allocations}
                                        onAllocationChange={handleAllocationChange}
                                        currentUserId={currentUserId}
                                    />
                                </CardContent>

                                {/* Card Footer - Fixed at Bottom */}
                                <CardFooter className="border-t bg-gray-50 p-4 flex-col gap-3">
                                    {/* Summary Stats */}
                                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Giá trị Milestone</p>
                                                <p className="text-base font-bold text-gray-900">
                                                    {formatVND(selectedMilestone.remainingAmount)}
                                                </p>
                                            </div>

                                            <div className="h-8 w-px bg-gray-300 hidden sm:block" />

                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Đã Phân Bổ</p>
                                                <p className="text-base font-bold text-blue-600">
                                                    {formatVND(totalAllocated)}
                                                </p>
                                            </div>

                                            <div className="h-8 w-px bg-gray-300 hidden sm:block" />

                                            <div>
                                                <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                                    Còn Lại
                                                    {remaining > 0 && <AlertTriangle className="h-3 w-3 text-orange-500" />}
                                                    {remaining === 0 && <CheckCircle className="h-3 w-3 text-green-500" />}
                                                    {remaining < 0 && <XCircle className="h-3 w-3 text-red-500" />}
                                                </p>
                                                <p className={cn(
                                                    "text-lg font-bold",
                                                    remaining > 0 && "text-orange-600",
                                                    remaining === 0 && "text-green-600",
                                                    remaining < 0 && "text-red-600"
                                                )}>
                                                    {formatVND(Math.abs(remaining))}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <Button
                                            size="lg"
                                            disabled={!canSubmit || isSubmitting}
                                            onClick={handleConfirmDistribution}
                                            className={cn(
                                                "w-full sm:w-auto min-w-[180px] font-semibold shadow-md",
                                                canSubmit
                                                    ? "bg-[#2a9d8f] hover:bg-[#21867a]"
                                                    : "bg-gray-300 cursor-not-allowed"
                                            )}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Xác Nhận Phân Bổ
                                                    <ArrowRight className="h-4 w-4 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Status Messages */}
                                    {remaining > 0 && totalAllocated > 0 && (
                                        <div className="w-full p-2 bg-orange-50 border border-orange-200 rounded">
                                            <p className="text-xs text-orange-800 text-center">
                                                ⚠️ Còn {formatVND(remaining)} chưa phân bổ
                                            </p>
                                        </div>
                                    )}

                                    {remaining === 0 && totalAllocated > 0 && (
                                        <div className="w-full p-2 bg-green-50 border border-green-200 rounded">
                                            <p className="text-xs text-green-800 text-center flex items-center justify-center gap-1">
                                                <CheckCircle className="h-3 w-3" />
                                                Hoàn hảo! Đã phân bổ đầy đủ
                                            </p>
                                        </div>
                                    )}

                                    {remaining < 0 && (
                                        <div className="w-full p-2 bg-red-50 border border-red-200 rounded">
                                            <p className="text-xs text-red-800 text-center flex items-center justify-center gap-1">
                                                <XCircle className="h-3 w-3" />
                                                Vượt quá {formatVND(Math.abs(remaining))}
                                            </p>
                                        </div>
                                    )}
                                </CardFooter>
                            </Card>
                        ) : (
                            <Card className="h-full shadow-md rounded-lg border-2 border-dashed flex items-center justify-center">
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
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TeamFundPage

