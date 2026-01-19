import { Badge } from "@/components/ui/badge"
import { calculateDaysRemaining, getMilestoneStatusBadge } from "@/helpers/milestone"
import type { Milestone } from "@/hooks/api/milestones"
import { CalendarDays, DollarSign } from "lucide-react"
import { CURRENCY_SUFFIX } from "@/const"

interface MilestoneInfoSectionProps {
    milestone: Milestone
}

export const MilestoneInfoSection: React.FC<MilestoneInfoSectionProps> = ({ milestone }) => {
    return (
        <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
                <span className="">Trạng thái:</span>
                {getMilestoneStatusBadge(milestone.status)}
            </div>

            <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Ngân sách:
                </span>
                <span className="font-medium">
                    {(milestone.budget ?? 0).toLocaleString('vi-VN')} {CURRENCY_SUFFIX}
                </span>
            </div>

            <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Ngày bắt đầu:
                </span>
                <span className="font-medium">
                    {new Date(milestone.startDate).toLocaleDateString('vi-VN')}
                </span>
            </div>

            <div className="flex justify-between items-center">
                <span className=" flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Ngày kết thúc:
                </span>
                <div className="flex items-center gap-2">
                    <span className="font-medium">
                        {new Date(milestone.endDate).toLocaleDateString('vi-VN')}
                    </span>
                    <Badge className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                        {calculateDaysRemaining(milestone.endDate)}
                    </Badge>
                </div>
            </div>
        </div>
    )
}