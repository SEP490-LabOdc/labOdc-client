import { createFileRoute } from '@tanstack/react-router'
import CompanyDetailPage from '@/features/companies/pages/public/CompanyDetailPage'
import { findCompanyById } from '@/features/companies/api/getCompanyById';

export const Route = createFileRoute('/(public)/companies/$companyId')({
    component: CompanyDetailPage,
    loader: ({ params }) => {
        const { companyId } = params;
        const company = findCompanyById(companyId)
        return {
            crumb: `${company!.name}`
        }
    }
})