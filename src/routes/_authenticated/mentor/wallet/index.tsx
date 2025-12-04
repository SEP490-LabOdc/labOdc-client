import { createFileRoute } from '@tanstack/react-router'
import { MyWalletPage } from '@/features/wallet'

export const Route = createFileRoute('/_authenticated/mentor/wallet/')({
  component: MyWalletPage,
})
