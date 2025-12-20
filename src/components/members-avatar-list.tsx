import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Users } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import type { ProjectMember } from '@/hooks/api/projects'
import { ROLE } from '@/const'

export interface MembersAvatarListProps {
  members: ProjectMember[]
  maxVisible?: number
  size?: 'sm' | 'md' | 'lg'
  showNames?: boolean
  showLeaderBadge?: boolean
  showCount?: boolean
  emptyMessage?: string
  className?: string
  onMemberClick?: (member: ProjectMember) => void
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
}

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

export const MembersAvatarList: React.FC<MembersAvatarListProps> = ({
  members,
  maxVisible = 5,
  size = 'md',
  showNames = false,
  showCount = false,
  emptyMessage = 'Chưa có thành viên',
  className = '',
  onMemberClick,
}) => {
  if (members.length === 0) {
    return (
      <div className={`flex items-center gap-2 text-gray-400 ${textSizeClasses[size]} ${className}`}>
        <Users className={sizeClasses[size]} />
        <span>{emptyMessage}</span>
      </div>
    )
  }

  const visibleMembers = members.slice(0, maxVisible)
  const remainingCount = members.length - maxVisible

  const avatarSize = sizeClasses[size]
  const textSize = textSizeClasses[size]

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {visibleMembers.map((member) => (
        <Tooltip key={member.projectMemberId || member.userId}>
          <TooltipTrigger asChild>
            <div
              className={`relative inline-flex items-center ${onMemberClick ? 'cursor-pointer' : ''}`}
              onClick={() => onMemberClick?.(member)}
            >
              <Avatar className={`${avatarSize} border-2 border-white shadow-sm hover:shadow-md transition-shadow`}>
                <AvatarImage src={member.avatarUrl} alt={member.fullName} />
                <AvatarFallback>
                  <img src={getAvatarUrl(member.fullName || '')} alt={member.fullName || ''} />
                </AvatarFallback>
              </Avatar>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-1">
              <div className="font-semibold flex items-center gap-2">
                {member.fullName}
              </div>
              <div className="text-xs text-gray-500">{member.email}</div>
              {member.roleName && (
                <div className="text-xs text-gray-400">
                  {member.roleName === ROLE.MENTOR ? 'Mentor' : 'Talent'}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      ))}

      {remainingCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center justify-center ${avatarSize} rounded-full bg-gray-200 text-gray-600 font-semibold ${textSize} border-2 border-white shadow-sm`}>
              +{remainingCount}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="space-y-1">
              <div className="font-semibold">Còn {remainingCount} thành viên khác</div>
              <div className="text-xs text-gray-500">
                {members.slice(maxVisible).map((m) => m.fullName).join(', ')}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      )}

      {showNames && (
        <div className="flex flex-wrap gap-2 ml-2">
          {visibleMembers.map((member) => (
            <span key={member.projectMemberId || member.userId} className={`${textSize} text-gray-700`}>
              {member.fullName}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className={`${textSize} text-gray-500`}>và {remainingCount} người khác</span>
          )}
        </div>
      )}

      {showCount && (
        <span className={`${textSize} text-gray-500 ml-1`}>
          ({members.length})
        </span>
      )}
    </div>
  )
}

