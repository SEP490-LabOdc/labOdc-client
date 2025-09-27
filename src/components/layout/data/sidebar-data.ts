import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
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
  IconHistory,         // For Lịch sử cập nhật
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
              title: 'Đã ngừng hoạt động',
              url: '/',
              icon: IconCircleX,
            },
          ]
        },
        {
          title: 'Quản lý dự án',
          icon: IconClipboardList, // Thay đổi icon này
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
              icon: IconCircleCheckFilled, // Thay đổi icon này
            },
            {
              title: 'Đã hủy', // Fix typo '/hủy'
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
              title: 'Tạo mới người dùng',
              url: '/',
              icon: IconUserCheck,
            },
            {
              title: 'Đang hoạt động',
              url: `/admin/users?status=%5B%22active%22%5D`,
              icon: IconUserCheck,
            },
            {
              title: 'Đã ngừng hoạt động',
              url: '/',
              icon: IconUserOff,
            },
            {
              title: 'Mentors',
              url: '/',
              icon: IconUserStar,
            },
            {
              title: 'Sinh viên',
              url: '/',
              icon: IconUserCode,
            },
          ]
        },
        {
          title: 'Quản lý hệ thống',
          icon: IconSettings,   // Thay đổi từ IconUsers sang IconSettings
          items: [
            {
              title: 'Lịch sử cập nhật',
              url: '/',
              icon: IconHistory, // Thay đổi từ IconUserSearch sang IconHistory
            }
          ]
        }
      ]
    },
    // {
    //   title: 'General',
    //   items: [
    //     {
    //       title: 'Dashboard',
    //       url: '/',
    //       icon: IconLayoutDashboard,
    //     },
    //     {
    //       title: 'Tasks',
    //       url: '/admin/tasks',
    //       icon: IconChecklist,
    //     },
    //     {
    //       title: 'Apps',
    //       url: '/apps',
    //       icon: IconPackages,
    //     },
    //     {
    //       title: 'Chats',
    //       url: '/chats',
    //       badge: '3',
    //       icon: IconMessages,
    //     },
    //     {
    //       title: 'Users',
    //       url: '/admin/users',
    //       icon: IconUsers,
    //     },
    //   ],
    // },
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Auth',
    //       icon: IconLockAccess,
    //       items: [
    //         {
    //           title: 'Sign In',
    //           url: '/sign-in',
    //         },
    //         {
    //           title: 'Sign In (2 Col)',
    //           url: '/sign-in-2',
    //         },
    //         {
    //           title: 'Sign Up',
    //           url: '/sign-up',
    //         },
    //         {
    //           title: 'Forgot Password',
    //           url: '/forgot-password',
    //         },
    //         {
    //           title: 'OTP',
    //           url: '/otp',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Errors',
    //       icon: IconBug,
    //       items: [
    //         {
    //           title: 'Unauthorized',
    //           url: '/401',
    //           icon: IconLock,
    //         },
    //         {
    //           title: 'Forbidden',
    //           url: '/403',
    //           icon: IconUserOff,
    //         },
    //         {
    //           title: 'Not Found',
    //           url: '/404',
    //           icon: IconError404,
    //         },
    //         {
    //           title: 'Internal Server Error',
    //           url: '/500',
    //           icon: IconServerOff,
    //         },
    //         {
    //           title: 'Maintenance Error',
    //           url: '/503',
    //           icon: IconBarrierBlock,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Other',
    //   items: [
    //     {
    //       title: 'Settings',
    //       icon: IconSettings,
    //       items: [
    //         {
    //           title: 'Profile',
    //           url: '/settings',
    //           icon: IconUserCog,
    //         },
    //         {
    //           title: 'Account',
    //           url: '/settings/account',
    //           icon: IconTool,
    //         },
    //         {
    //           title: 'Appearance',
    //           url: '/settings/appearance',
    //           icon: IconPalette,
    //         },
    //         {
    //           title: 'Notifications',
    //           url: '/settings/notifications',
    //           icon: IconNotification,
    //         },
    //         {
    //           title: 'Display',
    //           url: '/settings/display',
    //           icon: IconBrowserCheck,
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Help Center',
    //       url: '/help-center',
    //       icon: IconHelp,
    //     },
    //   ],
    // },
  ],
}
