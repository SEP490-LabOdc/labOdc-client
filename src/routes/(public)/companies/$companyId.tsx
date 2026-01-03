import { createFileRoute } from '@tanstack/react-router'
import CompanyDetailPage from '@/features/companies/pages/public/CompanyDetailPage'
import { getCompanyByIdQueryOptions } from '@/hooks/api/companies'
import { queryClient } from '@/hooks/api/reactQuery'

export const Route = createFileRoute('/(public)/companies/$companyId')({
    component: CompanyDetailPage,
    loader: async ({ params }) => {
        const { companyId } = params;

        try {
            const companyData = await queryClient.ensureQueryData(
                getCompanyByIdQueryOptions(companyId)
            )

            return {
                crumb: companyData?.data?.name || 'Chi tiết công ty'
            }
        } catch (error) {
            console.error('Failed to load company:', error)
            return {
                crumb: 'Chi tiết công ty'
            }
        }
    }
})