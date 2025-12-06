import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Crown, Loader2 } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import type { ProjectMember } from '@/hooks/api/projects'

interface MembersListProps {
    members: ProjectMember[]
    role: 'MENTOR' | 'TALENT'
    title: string
    emptyMessage: string
    iconColor?: string
    showActionButton?: boolean
    isActionLoading?: boolean
    onToggleLeader?: (memberId: string, currentLeaderStatus: boolean) => void
    leaderLabel?: string
    removeLeaderLabel?: string
    badgeLabel?: string
}

export const MembersList: React.FC<MembersListProps> = ({
    members,
    role,
    title,
    emptyMessage,
    iconColor = '#2a9d8f',
    showActionButton = false,
    isActionLoading = false,
    onToggleLeader,
    leaderLabel = 'Đặt làm leader',
    removeLeaderLabel = 'Gỡ leader',
    badgeLabel = 'Leader',
}) => {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" style={{ color: iconColor }} />
                    {title} ({members.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                {members.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {members.map((member: ProjectMember) => (
                            <div
                                key={member.projectMemberId}
                                className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white relative"
                            >
                                <div className="absolute top-3 right-3 flex items-center gap-2">
                                    {member.isLeader && (
                                        <Badge className="bg-yellow-100 text-yellow-800">
                                            {badgeLabel}
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 mb-3 pr-24">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={member.avatarUrl} />
                                        <AvatarFallback>
                                            <img src={getAvatarUrl(member.fullName)} alt={member.fullName} />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                                            {role === 'MENTOR' ? (
                                                <>
                                                    {member.fullName}
                                                    {member.isLeader && (
                                                        <Crown className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                    )}
                                                </>
                                            ) : (
                                                <span className="truncate">{member.fullName}</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500 truncate">{member.email}</div>
                                    </div>
                                </div>
                                {showActionButton && onToggleLeader && (
                                    <Button
                                        size="sm"
                                        variant={member.isLeader ? "default" : "outline"}
                                        className={`w-full mt-3 ${member.isLeader
                                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                            : 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                                            }`}
                                        disabled={isActionLoading}
                                        onClick={() => onToggleLeader(member.userId, member.isLeader || false)}
                                    >
                                        {isActionLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Đang xử lý...
                                            </>
                                        ) : member.isLeader ? (
                                            <>
                                                <Crown className="h-4 w-4 mr-2" />
                                                {removeLeaderLabel}
                                            </>
                                        ) : (
                                            <>
                                                <Crown className="h-4 w-4 mr-2" />
                                                {leaderLabel}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                        {emptyMessage}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

