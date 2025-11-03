import {
  IconLayoutDashboard,
  IconSettings,
  IconUserOff,      // For Đã ngừng users
  IconUsers,
  IconBuildingStore, // For Quản lý đối tác
  IconClockHour4,    // For Đang chờ
  IconCircleCheck,   // For Đang hoạt động
  IconCircleX,       // For Đã ngừng
  IconUserSearch,    // For Tất cả users
  IconUserCheck,     // For Đang hoạt động users
  IconUserStar,      // For Mentors
  IconClipboardList,    // For Quản lý dự án
  IconCircleCheckFilled,// For Đã hoàn thành
  IconHistory,
  IconList,         // For Lịch sử cập nhật
} from '@tabler/icons-react'
// import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'
import { USER_ROLE, USER_ROLE_LABEL } from '@/features/admin/users/data/schema'
import { Building2, FlaskConical, LockKeyhole, User } from 'lucide-react'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Lab Management',
      items: [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Quản lý đối tác',
          icon: IconBuildingStore,
          items: [
            {
              title: 'Tất cả',
              url: '/admin/companies',
              icon: IconList,
            },
            {
              title: 'Đang chờ xác thực',
              url: '/admin/companies?status=["PENDING"]',
              icon: IconClockHour4,
            },
            {
              title: 'Đang hoạt động',
              url: '/admin/companies?status=["ACTIVE"]',
              icon: IconCircleCheck,
            },
            {
              title: 'Đã vô hiệu hóa',
              url: '/admin/companies?status=["DISABLED"]',
              icon: IconCircleX,
            },
          ]
        },
        {
          title: 'Quản lý dự án',
          icon: IconClipboardList,
          items: [
            {
              title: 'Đang chờ phê duyệt',
              url: '/',
              icon: IconClockHour4,
            },
            {
              title: 'Đang hoạt động',
              url: '/',
              icon: IconCircleCheck,
            },
            {
              title: 'Đã hoàn thành',
              url: '/',
              icon: IconCircleCheckFilled,
            },
            {
              title: 'Đã hủy',
              url: '/',
              icon: IconCircleX,
            },
          ]
        },
        {
          title: 'Quản lý người dùng',
          icon: IconUsers,
          items: [
            {
              title: 'Tất cả',
              url: '/admin/users',
              icon: IconUserSearch,
            },
            {
              title: 'Đang hoạt động',
              url: `/admin/users?status=["ACTIVE"]`,
              icon: IconUserCheck,
            },
            {
              title: 'Đã ngừng hoạt động',
              url: '/admin/users?status=["INACTIVE"]',
              icon: IconUserOff,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.SYSTEM_ADMIN],
              url: '/admin/users?role=["' + USER_ROLE.SYSTEM_ADMIN + '"]',
              icon: LockKeyhole,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.LAB_ADMIN],
              url: '/admin/users?role=["' + USER_ROLE.LAB_ADMIN + '"]',
              icon: FlaskConical,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.COMPANY],
              url: '/admin/users?role=["' + USER_ROLE.COMPANY + '"]',
              icon: Building2,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.SUPERVISOR],
              url: '/admin/users?role=["' + USER_ROLE.SUPERVISOR + '"]',
              icon: IconUserStar,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.USER],
              url: '/admin/users?role=["' + USER_ROLE.USER + '"]',
              icon: User,
            },
          ]
        },
        {
          title: 'Quản lý hệ thống',
          icon: IconSettings,
          items: [
            {
              title: 'Lịch sử cập nhật',
              url: '/',
              icon: IconHistory,
            }
          ]
        }
      ]
    },
  ],
}
