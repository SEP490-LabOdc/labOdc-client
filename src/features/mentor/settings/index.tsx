import { Outlet } from '@tanstack/react-router'
import { Palette, Wrench, UserCog } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Main } from '@/components/layout/main'
import { SidebarNav } from '@/features/settings/components/sidebar-nav'

const sidebarNavItems = [
  {
    title: 'Hồ sơ',
    href: '/mentor/settings',
    icon: <UserCog size={18} />,
  },
  {
    title: 'Tài khoản',
    href: '/mentor/settings/account',
    icon: <Wrench size={18} />,
  },
  {
    title: 'Giao diện',
    href: '/mentor/settings/appearance',
    icon: <Palette size={18} />,
  }
]

export function Settings() {
  return (
    <>
      <Main fixed>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Cài đặt
          </h1>
          <p className='text-muted-foreground'>
            Quản lý các cài đặt tài khoản của bạn và thiết lập tùy chọn e-mail.
          </p>
        </div>
        <Separator className='my-4 lg:my-6' />
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full overflow-y-hidden p-1'>
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}