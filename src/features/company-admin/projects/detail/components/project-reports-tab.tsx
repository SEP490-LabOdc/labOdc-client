// src/features/company-admin/projects/detail/components/project-reports-tab.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type ProjectReportsTabProps = {
    projectId: string
    isLoading: boolean
}

export function ProjectReportsTab({ projectId: _projectId, isLoading }: ProjectReportsTabProps) {
    // TODO: Dùng useQuery để fetch reports với projectId

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">No reports found.</p>
                {/* TODO: Map qua data reports ở đây */}
            </CardContent>
        </Card>
    )
}