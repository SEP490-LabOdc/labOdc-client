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
  IconUserCode,      // For Sinh viên
  IconClipboardList,    // For Quản lý dự án
  IconCircleCheckFilled,// For Đã hoàn thành
  IconHistory,
  IconList,         // For Lịch sử cập nhật
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
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
              title: 'Đang chờ phê duyệt',
              url: '/admin/companies?status=["approving"]',
              icon: IconClockHour4,
            },
            {
              title: 'Đang hoạt động',
              url: '/admin/companies?status=["active"]',
              icon: IconCircleCheck,
            },
            {
              title: 'Đã ngừng hoạt động',
              url: '/admin/companies?status=["inactive"]',
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
              url: `/admin/users?status=["active"]`,
              icon: IconUserCheck,
            },
            {
              title: 'Đã ngừng hoạt động',
              url: '/admin/users?status=["inactive"]',
              icon: IconUserOff,
            },
            {
              title: 'Mentors',
              url: '/admin/users?role=["mentor"]',
              icon: IconUserStar,
            },
            {
              title: 'Sinh viên',
              url: '/admin/users?role=["talent"]',
              icon: IconUserCode,
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
