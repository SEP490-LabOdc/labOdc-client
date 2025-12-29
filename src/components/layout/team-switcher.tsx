import { Link } from '@tanstack/react-router'
import {
  SidebarMenuButton,
} from '@/components/ui/sidebar'

export function TeamSwitcher({
}: {
  }) {
  return (
    <Link to="/">
      <SidebarMenuButton
        size='lg'
        className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
      >
        <div className='flex aspect-square size-10 items-center justify-center rounded-md'>
          {/* bg-sidebar-primary text-sidebar-primary-foreground  */}
          <img src='/logo.png' alt='logo LabOdc' />
        </div>
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>
            LabOdc
          </span>
          <span className='truncate text-xs'>Kết nối Tài năng với Doanh nghiệp</span>
        </div>
      </SidebarMenuButton>
    </Link>
  )
}
