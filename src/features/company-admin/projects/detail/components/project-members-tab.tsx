// src/features/company-admin/projects/detail/components/project-members-tab.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type ProjectMembersTabProps = {
    projectId: string
    isLoading: boolean
}

export function ProjectMembersTab({ projectId: _projectId, isLoading }: ProjectMembersTabProps) {
    // TODO: Dùng useQuery để fetch members với projectId

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Project Members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Members</CardTitle>
            </CardHeader>
            <CardContent>
                <p>No members found.</p>
                {/* TODO: Map qua data members ở đây */}
            </CardContent>
        </Card>
    )
}