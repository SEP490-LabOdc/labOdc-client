import {
  IconLayoutDashboard,
  IconClockHour4,
  IconCircleCheck,
  IconCircleX,
  IconClipboardList,
  IconCircleCheckFilled, IconList,
} from '@tabler/icons-react'
import type { SidebarData } from '@/components/layout/types.ts'

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
              url: '/talent/my-projects',
              icon: IconList,
            },
            {
              title: 'Đã ứng tuyển',
              url: '/talent/projects?status=["PENDING"]',
              icon: IconClockHour4,
            },
            {
              title: 'Đang tiến hành',
              url: '/company-admin/projects?status=["IN_PROGRESS"]',
              icon: IconCircleCheck,
            },
            {
              title: 'Đã hoàn thành',
              url: '/company-admin/projects?status=["COMPLETED"]',
              icon: IconCircleCheckFilled,
            },
            {
              title: 'Đã hủy',
              url: '/company-admin/projects?status=[CLOSED"]',
              icon: IconCircleX,
            },
          ]
        },
      ]
    },
  ],
}
