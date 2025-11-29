import { createFileRoute } from '@tanstack/react-router'
import ProjectDetailPage from '@/features/mentor/project-detail'
import { getProjectByIdQueryOptions } from '@/hooks/api/projects'
import { queryClient } from '@/hooks/api/reactQuery.tsx'

export const Route = createFileRoute('/_authenticated/mentor/projects/$projectId/')({
  component: ProjectDetailPage,
  loader: async ({ params }) => {
    const { projectId } = params;

    try {
      const project = await queryClient.ensureQueryData(
        getProjectByIdQueryOptions(projectId)
      )

      return {
        crumb: project?.title || 'Chi tiết dự án'
      }
    } catch (error) {
      console.error('Failed to load project:', error)
      return {
        crumb: 'Chi tiết dự án'
      }
    }
  }
})
