import {
  IconLayoutDashboard,
  IconClockHour4,
  IconCircleCheck,
  IconCircleX,
  IconClipboardList,
  IconCircleCheckFilled,
  IconList,
  IconWallet,
  IconHistory,
} from '@tabler/icons-react'
import type { SidebarData } from '@/components/layout/types.ts'
import { ProjectStatus } from '@/hooks/api/projects/enums'

export const mentorSidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Mentor dashboard',
      items: [
        {
          title: 'Dashboard',
          url: '/mentor',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Dự án',
          icon: IconClipboardList,
          items: [
            {
              title: 'Tất cả',
              url: '/mentor/projects',
              icon: IconList,
            },
            {
              title: 'Đang lên kế hoạch',
              url: `/mentor/projects?status=${ProjectStatus.PLANNING}`,
              icon: IconClockHour4,
            },
            {
              title: 'Đang tiến hành',
              url: `/mentor/projects?status=${ProjectStatus.ON_GOING}`,
              icon: IconCircleCheck,
            },
            {
              title: 'Đã hoàn thành',
              url: `/mentor/projects?status=${ProjectStatus.COMPLETED}`,
              icon: IconCircleCheckFilled,
            },
            {
              title: 'Đã tạm dừng',
              url: `/mentor/projects?status=${ProjectStatus.PAUSED}`,
              icon: IconCircleX,
            },
            {
              title: 'Đã đóng',
              url: `/mentor/projects?status=${ProjectStatus.CLOSED}`,
              icon: IconCircleX,
            },
          ]
        },
        {
          title: 'Quỹ nhóm',
          url: '/mentor/team-fund-distribution',
          icon: IconWallet,
        },
        {
          title: 'Ví',
          url: '/mentor/wallet',
          icon: IconWallet,
        },
        {
          title: "Giao dịch của tôi",
          url: '/mentor/my-transactions',
          icon: IconHistory,
        }
      ]
    },
  ],
}
