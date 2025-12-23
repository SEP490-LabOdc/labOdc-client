import { createFileRoute } from '@tanstack/react-router'
import MyTransactions from '@/features/my-transactions'

export const Route = createFileRoute('/_authenticated/company-manage/my-transactions/')({
    component: MyTransactions,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            page: search.page ? Number(search.page) : undefined,
            size: search.size ? Number(search.size) : undefined,
            sortBy: search.sortBy as string | undefined,
            sortDir: search.sortDir as 'ASC' | 'DESC' | undefined,
        }
    },
})
