import React from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { useGetMilestoneById, useGetMilestonesFeedbacks } from '@/hooks/api/milestones/queries'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { MilestoneFeedbackCard } from './components/milestone-feedback-card'
import { UpdateMilestoneForm } from './components/update-milestone-form'

const UpdateMilestonePage: React.FC = () => {
    const { milestoneId, projectId } = useParams({ strict: false })
    const navigate = useNavigate()

    // API Queries
    const { data: milestoneData, isLoading: isLoadingMilestone, error: milestoneError } =
        useGetMilestoneById(milestoneId as string)

    const { data: feedbackData, isLoading: isLoadingFeedback } =
        useGetMilestonesFeedbacks(milestoneId as string)

    if (isLoadingMilestone || isLoadingFeedback) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (milestoneError || !milestoneData?.data) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Lỗi tải dữ liệu milestone</p>
                    <Button
                        variant="outline"
                        onClick={() => navigate({ to: '/projects' })}
                    >
                        Quay lại
                    </Button>
                </div>
            </div>
        )
    }

    const milestone = milestoneData.data
    const feedback = feedbackData

    const handleBack = () => {
        const basePath = '/projects' // Adjust based on your routing structure
        navigate({
            to: `${basePath}/${projectId}/${milestoneId}`,
            params: { projectId: projectId as string, milestoneId: milestoneId as string },
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto p-10 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">Cập nhật Milestone</h1>
                </div>

                {/* Feedback Section */}
                <MilestoneFeedbackCard
                    feedback={feedback}
                    isLoading={isLoadingFeedback}
                />

                {/* Update Form */}
                <UpdateMilestoneForm
                    milestone={milestone}
                    milestoneId={milestoneId as string}
                    projectId={projectId as string}
                />
            </div>
        </div>
    )
}

export default UpdateMilestonePage
