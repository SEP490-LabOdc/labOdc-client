import { createFileRoute } from '@tanstack/react-router'
import { MyWalletPage } from '@/features/wallet'

export const Route = createFileRoute('/_authenticated/company-manage/wallet/')({
  component: MyWalletPage,
})
