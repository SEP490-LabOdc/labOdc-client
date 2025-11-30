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
  IconList,
  IconProgress,
  IconEdit,
  IconPencilCog,
  IconCircleXFilled,
} from '@tabler/icons-react'
// import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'
import { USER_ROLE, USER_ROLE_LABEL } from '@/features/admin/users/data/schema'
import { Building2, FlaskConical, LockKeyhole, User } from 'lucide-react'
import { PROJECT_STATUS } from '@/features/companyManage/project/data/schema'

export const systemAmdminSidebarData: SidebarData = {
  navGroups: [
    {
      title: 'LabOdc System Admin',
      items: [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Quản lý công ty',
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

export const labAdminSidebarData: SidebarData = {
  navGroups: [
    {
      title: 'LabOdc Manager',
      items: [
        {
          title: 'Dashboard',
          url: '/lab-admin',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Quản lý công ty',
          icon: IconBuildingStore,
          items: [
            {
              title: 'Tất cả',
              url: '/lab-admin/companies',
              icon: IconList,
            },
            {
              title: 'Đang chờ xác thực',
              url: '/lab-admin/companies?status=["PENDING"]',
              icon: IconClockHour4,
            },
            {
              title: 'Đang hoạt động',
              url: '/lab-admin/companies?status=["ACTIVE"]',
              icon: IconCircleCheck,
            },
            {
              title: 'Đã vô hiệu hóa',
              url: '/lab-admin/companies?status=["DISABLED"]',
              icon: IconCircleX,
            },
          ]
        },
        {
          title: 'Quản lý dự án',
          icon: IconClipboardList,
          items: [
            { title: 'Tất cả', url: '/lab-admin/projects', icon: IconList },

            // --- PLANNING ---
            { title: 'Chờ duyệt', url: '/lab-admin/projects?status=["' + PROJECT_STATUS.PENDING + '"]', icon: IconClockHour4 },
            { title: 'Công ty cập nhật', url: '/lab-admin/projects?status=["' + PROJECT_STATUS.UPDATE_REQUIRED + '"]', icon: IconEdit },
            { title: 'Xây dựng kế hoạch', url: '/lab-admin/projects?status=["' + PROJECT_STATUS.PLANNING + '"]', icon: IconPencilCog },
            { title: 'Bị từ chối', url: '/lab-admin/projects?status=["' + PROJECT_STATUS.REJECTED + '"]', icon: IconCircleXFilled },
            // --- EXECUTING ---
            { title: 'Đang thực hiện', url: '/lab-admin/projects?status=["' + PROJECT_STATUS.ON_GOING + '"]', icon: IconProgress },
            { title: 'Hoàn thành', url: '/lab-admin/projects?status=["' + PROJECT_STATUS.COMPLETE + '"]', icon: IconCircleCheckFilled },
          ],
        },
        {
          title: 'Người dùng',
          icon: IconUsers,
          items: [
            {
              title: 'Tất cả',
              url: '/lab-admin/users',
              icon: IconUserSearch,
            },
            {
              title: 'Đang hoạt động',
              url: `/lab-admin/users?status=["ACTIVE"]`,
              icon: IconUserCheck,
            },
            {
              title: 'Đã ngừng hoạt động',
              url: '/lab-admin/users?status=["INACTIVE"]',
              icon: IconUserOff,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.SYSTEM_ADMIN],
              url: '/lab-admin/users?role=["' + USER_ROLE.SYSTEM_ADMIN + '"]',
              icon: LockKeyhole,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.LAB_ADMIN],
              url: '/lab-admin/users?role=["' + USER_ROLE.LAB_ADMIN + '"]',
              icon: FlaskConical,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.COMPANY],
              url: '/lab-admin/users?role=["' + USER_ROLE.COMPANY + '"]',
              icon: Building2,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.SUPERVISOR],
              url: '/lab-admin/users?role=["' + USER_ROLE.SUPERVISOR + '"]',
              icon: IconUserStar,
            },
            {
              title: USER_ROLE_LABEL[USER_ROLE.USER],
              url: '/lab-admin/users?role=["' + USER_ROLE.USER + '"]',
              icon: User,
            },
          ]
        },
      ]
    },
  ],
}

export const supervisorSidebarData: SidebarData = {
  navGroups: [
    {
      title: 'LabOdc Supervisor',
      items: [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Quản lý công ty',
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
      ]
    },
  ],
}

export const companySidebarData: SidebarData = {
  navGroups: [
    {
      title: 'LabOdc Company',
      items: [
        {
          title: 'Dashboard',
          url: '/company-manage',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Quản lý dự án',
          icon: IconClipboardList,
          items: [
            { title: 'Tất cả', url: '/company-manage/projects', icon: IconList },
            { title: 'Chờ duyệt', url: '/company-manage/projects?status=["' + PROJECT_STATUS.PENDING + '"]', icon: IconClockHour4 },
            { title: 'Công ty cập nhật', url: '/company-manage/projects?status=["' + PROJECT_STATUS.UPDATE_REQUIRED + '"]', icon: IconEdit },
            { title: 'Xây dựng kế hoạch', url: '/company-manage/projects?status=["' + PROJECT_STATUS.PLANNING + '"]', icon: IconPencilCog },
            { title: 'Bị từ chối', url: '/company-manage/projects?status=["' + PROJECT_STATUS.REJECTED + '"]', icon: IconCircleXFilled },
            { title: 'Đang thực hiện', url: '/company-manage/projects?status=["' + PROJECT_STATUS.ON_GOING + '"]', icon: IconProgress },
            { title: 'Hoàn thành', url: '/company-manage/projects?status=["' + PROJECT_STATUS.COMPLETE + '"]', icon: IconCircleCheckFilled },
          ],
        }
      ]
    },
  ],
}

export const userSidebarData: SidebarData = {
  navGroups: [
    {
      title: 'LabOdc User',
      items: [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Quản lý công ty',
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
      ]
    },
  ],
}
