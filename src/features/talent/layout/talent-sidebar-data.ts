import {
  IconLayoutDashboard,
  IconClockHour4,
  IconCircleCheck,
  IconCircleX,
  IconClipboardList,
  IconList,
  IconWallet,
} from '@tabler/icons-react'
import type { SidebarData } from '@/components/layout/types.ts'
import { ProjectTypes } from '@/hooks/api/projects'

export const talentSidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Talent dashboard',
      items: [
        {
          title: 'Dashboard',
          url: '/talent',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Dự án',
          icon: IconClipboardList,
          items: [
            {
              title: 'Tất cả',
              url: '/talent/projects',
              icon: IconList,
            },
            {
              title: 'Đã ứng tuyển',
              url: `/talent/my-applications`,
              icon: IconClockHour4,
            },
            {
              title: 'Đang lên kế hoạch',
              url: `/talent/projects?status=${ProjectTypes.PLANNING}`,
              icon: IconClockHour4,
            },
            {
              title: 'Đang tiến hành',
              url: `/talent/projects?status=${ProjectTypes.ON_GOING}`,
              icon: IconCircleCheck,
            },
            {
              title: 'Đã tạm dừng',
              url: `/talent/projects?status=${ProjectTypes.PAUSED}`,
              icon: IconCircleX,
            },
            {
              title: 'Đã đóng',
              url: `/talent/projects?status=${ProjectTypes.CLOSED}`,
              icon: IconCircleX,
            },
          ]
        },
        {
          title: 'Quỹ nhóm',
          url: '/talent/team-fund-distribution',
          icon: IconWallet,
        },
        {
          title: 'Ví',
          url: '/talent/wallet',
          icon: IconWallet,
        },
      ]
    },
  ],
}
