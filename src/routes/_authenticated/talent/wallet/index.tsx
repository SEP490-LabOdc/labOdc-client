import { createFileRoute } from '@tanstack/react-router'
import { MyWalletPage } from '@/features/wallet'

export const Route = createFileRoute('/_authenticated/talent/wallet/')({
  component: MyWalletPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      code: (search.code as string) || undefined,
      id: (search.id as string) || undefined,
      cancel: (search.cancel as string) || undefined,
      status: (search.status as string) || undefined,
      orderCode: (search.orderCode as string) || undefined,
    }
  },
})
