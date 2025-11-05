import {
  IconLayoutDashboard,
  IconClockHour4,
  IconCircleCheck,
  IconCircleX,
  IconClipboardList,
  IconCircleCheckFilled, IconList,
} from '@tabler/icons-react'
import type { SidebarData } from '@/components/layout/types.ts'

export const companyAdminSidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Lab Management',
      items: [
        {
          title: 'Dashboard',
          url: '/company-admin',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Quản lý dự án',
          icon: IconClipboardList,
          items: [
            {
              title: 'Tất cả',
              url: '/company-admin/projects',
              icon: IconList,
            },
            {
              title: 'Đang chờ phê duyệt',
              url: '/company-admin/projects?status=["PENDING"]',
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
