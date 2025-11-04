// src/features/company-admin/projects/detail/components/project-milestones-tab.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { CreateMilestoneDialog } from './create-milestone-dialog'
import { useState } from 'react'

type ProjectMilestonesTabProps = {
    projectId: string
    isLoading: boolean
}

export function ProjectMilestonesTab({ projectId, isLoading }: ProjectMilestonesTabProps) {
    const [isCreateOpen, setCreateOpen] = useState(false)
    // TODO: Dùng useQuery để fetch milestones với projectId

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Milestones</CardTitle>
                    <Button size="sm" onClick={() => setCreateOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Milestone
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading && (
                        <>
                            <Skeleton className="h-16 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </>
                    )}

                    {!isLoading && (
                        <p className="text-sm text-muted-foreground">No milestones found.</p>
                    )}

                    {/* TODO: Map qua data milestones ở đây */}
                </CardContent>
            </Card>

            <CreateMilestoneDialog
                projectId={projectId}
                isOpen={isCreateOpen}
                onOpenChange={setCreateOpen}
            />
        </>
    )
}