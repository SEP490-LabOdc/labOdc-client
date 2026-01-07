import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Milestone } from '@/hooks/api/milestones/types'

interface MilestoneListProps {
    milestones: Milestone[]
    selectedMilestoneId: string
    selectedProjectId: string
    isLoading: boolean
    onMilestoneSelect: (milestoneId: string) => void
}

export const MilestoneList: React.FC<MilestoneListProps> = ({
    milestones,
    selectedMilestoneId,
    selectedProjectId,
    isLoading,
    onMilestoneSelect
}) => {
    return (
        <Card className="flex-1 shadow-md rounded-md border-2 overflow-hidden flex flex-col">
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="h-5 w-5 text-[#2a9d8f]" />
                    Milestones ({milestones.length})
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                    <div className="px-4 space-y-2">
                        {!selectedProjectId ? (
                            <div className="text-center py-8 text-gray-500">
                                <p className="text-sm">Vui lòng chọn dự án trước</p>
                            </div>
                        ) : isLoading ? (
                            <div className="text-center py-8 text-gray-500">
                                <p className="text-sm">Đang tải milestones...</p>
                            </div>
                        ) : milestones.length > 0 ? (
                            milestones.map((milestone) => {
                                const isSelected = milestone.id === selectedMilestoneId

                                return (
                                    <button
                                        key={milestone.id}
                                        onClick={() => onMilestoneSelect(milestone.id)}
                                        className={cn(
                                            "w-full text-left p-4 rounded-md border-2 transition-all",
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
                                                    <Badge className="bg-indigo-500 text-white shrink-0">
                                                        Đang chọn
                                                    </Badge>
                                                )}
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
    )
}

