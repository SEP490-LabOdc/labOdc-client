import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import { TeamSwitcher } from '@/components/layout/team-switcher'
import { companySidebarData, labAdminSidebarData, supervisorSidebarData, systemAmdminSidebarData, userSidebarData } from './data/sidebar-data'
import { useUser } from '@/context/UserContext'
import type { SidebarData } from './types'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  type UserRole = 'SYSTEM_ADMIN' | 'LAB_ADMIN' | 'MENTOR' | 'COMPANY' | 'USER';

  let sidebar: SidebarData;

  const roleSidebar: Record<UserRole, SidebarData> = {
    SYSTEM_ADMIN: systemAmdminSidebarData,
    LAB_ADMIN: labAdminSidebarData,
    MENTOR: supervisorSidebarData,
    COMPANY: companySidebarData,
    USER: userSidebarData
  };

  const DEFAULT_SIDEBAR = userSidebarData;

  const role = user?.role as UserRole | undefined;

  sidebar = role ? roleSidebar[role] : DEFAULT_SIDEBAR;

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {sidebar.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
