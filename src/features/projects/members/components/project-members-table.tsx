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
import { getAvatarUrl } from '@/lib/utils'
import type { ProjectMember } from '@/hooks/api/projects'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import { formatDateOnly } from '@/helpers/datetime'

interface ProjectMembersTableProps {
    members: ProjectMember[]
    title: string
    emptyMessage: string
    iconColor?: string
}

export const ProjectMembersTable: React.FC<ProjectMembersTableProps> = ({
    members,
    title,
    emptyMessage,
    iconColor = '#2a9d8f',
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.projectMemberId}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={member.avatarUrl} />
                                                <AvatarFallback>
                                                    <img src={getAvatarUrl(member.fullName)} alt={member.fullName} />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col min-w-0">
                                                <div className="font-medium text-gray-900 truncate">
                                                    {member.fullName}
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

