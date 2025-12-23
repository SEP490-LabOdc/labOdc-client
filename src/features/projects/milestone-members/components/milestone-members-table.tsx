import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Crown, Loader2 } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import type { MilestoneMember } from '@/hooks/api/milestones'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import { formatDateOnly } from '@/helpers/datetime'

interface MilestoneMembersTableProps {
    members: MilestoneMember[]
    title: string
    emptyMessage: string
    iconColor?: string
    showActionButton?: boolean
    isActionLoading?: boolean
    onToggleLeader?: (milestoneMemberId: string, currentLeaderStatus: boolean) => void
}

export const MilestoneMembersTable: React.FC<MilestoneMembersTableProps> = ({
    members,
    title,
    emptyMessage,
    iconColor = '#2a9d8f',
    showActionButton = false,
    isActionLoading = false,
    onToggleLeader,
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Thành viên</TableHead>
                                <TableHead>Số điện thoại</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Ngày tham gia</TableHead>
                                <TableHead>Ngày rời</TableHead>
                                {showActionButton && <TableHead className="text-right">Thao tác</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.milestoneMemberId}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={member.avatarUrl} />
                                                <AvatarFallback>
                                                    <img src={getAvatarUrl(member.fullName)} alt={member.fullName} />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col min-w-0">
                                                <div className="font-medium text-gray-900 truncate flex items-center gap-2">
                                                    {member.fullName}
                                                    {member.leader && (
                                                        <Badge variant="secondary" className="flex-shrink-0 bg-yellow-100 text-yellow-800">
                                                            <Crown className="h-3 w-3" />
                                                            <span>Trưởng nhóm</span>
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500 truncate">
                                                    {member.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-gray-700">
                                            {member.phone || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={member.isActive ? 'default' : 'secondary'}
                                            className={member.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                                        >
                                            {member.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-gray-700">
                                            {formatDateOnly(member.joinedAt)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm text-gray-700">
                                            {formatDateOnly(member.leftAt)}
                                        </span>
                                    </TableCell>
                                    {showActionButton && (
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant={member.leader ? "default" : "outline"}
                                                className={member.leader
                                                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                    : 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                                                }
                                                disabled={isActionLoading}
                                                onClick={() => onToggleLeader?.(member.milestoneMemberId, member.leader)}
                                            >
                                                {isActionLoading ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Đang xử lý...
                                                    </>
                                                ) : member.leader ? (
                                                    <>
                                                        <Crown className="h-4 w-4 mr-2" />
                                                        <span>Gỡ trưởng nhóm</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Crown className="h-4 w-4 mr-2" />
                                                        <span>Đặt làm trưởng nhóm</span>
                                                    </>
                                                )}
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-gray-500 text-center py-8">
                        {emptyMessage}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

