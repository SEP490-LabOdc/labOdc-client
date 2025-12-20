import type { NavItem } from "@/components/layout/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProjectStatus } from '@/hooks/api/projects'
import { ROLE } from '@/const.ts'
import { getLastNameForAvatar } from '@/helpers/stringUtils.ts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url || // /endpoint?search=param
    href.split('?')[0] === item.url || // endpoint
    !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
    (mainNav &&
      href.split('/')[1] !== '' &&
      href.split('/')[1] === item?.url?.split('/')[1])
  )
}

export function getPageNumbers(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5 // Maximum number of page buttons to show
  const rangeWithDots = []

  if (totalPages <= maxVisiblePages) {
    // If total pages is 5 or less, show all pages
    for (let i = 1; i <= totalPages; i++) {
      rangeWithDots.push(i)
    }
  } else {
    // Always show first page
    rangeWithDots.push(1)

    if (currentPage <= 3) {
      // Near the beginning: [1] [2] [3] [4] ... [10]
      for (let i = 2; i <= 4; i++) {
        rangeWithDots.push(i)
      }
      rangeWithDots.push('...', totalPages)
    } else if (currentPage >= totalPages - 2) {
      // Near the end: [1] ... [7] [8] [9] [10]
      rangeWithDots.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) {
        rangeWithDots.push(i)
      }
    } else {
      // In the middle: [1] ... [4] [5] [6] ... [10]
      rangeWithDots.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        rangeWithDots.push(i)
      }
      rangeWithDots.push('...', totalPages)
    }
  }

  return rangeWithDots
}

// Project status color mapping
const StatusColorMap: Record<ProjectStatus, string> = {
  // PENDING: Vàng (Cảnh báo nhẹ/Chờ đợi) -> Giữ nguyên
  [ProjectStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  // UPDATE_REQUIRED: Cam (Cần chú ý hơn vàng/Hành động gấp) -> Giữ nguyên
  [ProjectStatus.UPDATE_REQUIRED]: 'bg-orange-100 text-orange-800 border-orange-200',
  // REJECTED: Đỏ (Lỗi/Tiêu cực/Dừng lại) -> Giữ nguyên
  [ProjectStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-200',
  // PLANNING: Tím nhạt hoặc Indigo (Giai đoạn ý tưởng/Trừu tượng)
  [ProjectStatus.PLANNING]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  // ON_GOING: Xanh dương (Tiêu chuẩn cho trạng thái "In Progress"/Đang hoạt động)
  [ProjectStatus.ON_GOING]: 'bg-blue-100 text-blue-800 border-blue-200',
  // CLOSED: Xám đá (Slate) (Trung tính/Vô hiệu hóa/Lưu trữ)
  [ProjectStatus.CLOSED]: 'bg-slate-100 text-slate-600 border-slate-200',
  // COMPLETED: Xanh lá (Thành công/Hoàn tất)
  [ProjectStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-200',
  // PAUSED: Hổ phách (Trạng thái tĩnh/Tạm dừng - khác với đang chờ xử lý)
  [ProjectStatus.PAUSED]: 'bg-amber-100 text-amber-800 border-amber-200',
  // PENDING_START: Xanh da trời/Sky (Tươi sáng, báo hiệu sắp bắt đầu)
  [ProjectStatus.PENDING_START]: 'bg-sky-100 text-sky-800 border-sky-200',
  // PAID: Ngọc lục bảo (Emerald) (Thường dùng cho Tài chính/Tiền tệ/An toàn)
  [ProjectStatus.PAID]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

// Project status label mapping
const StatusLabelMap: Record<ProjectStatus, string> = {
  [ProjectStatus.PENDING]: 'Chờ duyệt',
  [ProjectStatus.UPDATE_REQUIRED]: 'Cần cập nhật',
  [ProjectStatus.REJECTED]: 'Từ chối',
  [ProjectStatus.PLANNING]: 'Lên kế hoạch',
  [ProjectStatus.ON_GOING]: 'Đang thực hiện',
  [ProjectStatus.CLOSED]: 'Đã đóng',
  [ProjectStatus.COMPLETED]: 'Hoàn thành',
  [ProjectStatus.PAUSED]: 'Tạm dừng',
  [ProjectStatus.PENDING_START]: 'Chờ bắt đầu',
  [ProjectStatus.PAID]: 'Đã thanh toán',
}

export function getStatusColor(status: string): string {
  return StatusColorMap[status as ProjectStatus] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export function getStatusLabel(status: string): string {
  return StatusLabelMap[status as ProjectStatus] || status
}

export const getTagColor = (tag: string) => {
  if (tag.toLowerCase().includes('admin')) {
    return 'bg-pink-100 text-pink-800'
  }
  if (tag.toLowerCase().includes('tech')) {
    return 'bg-blue-100 text-blue-800'
  }
  return 'bg-gray-100 text-gray-800'
}

const candidateStatusColorMap: Record<string, string> = {
  'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'APPROVED': 'bg-green-100 text-green-800 border-green-200',
  'REJECTED': 'bg-red-100 text-red-800 border-red-200',
}

// Candidate status label mapping
const candidateStatusLabelMap: Record<string, string> = {
  'PENDING': 'Đang chờ',
  'APPROVED': 'Đã duyệt',
  'REJECTED': 'Từ chối',
}

export function getCandidateStatusColor(status: string): string {
  return candidateStatusColorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export function getCandidateStatusLabel(status: string): string {
  return candidateStatusLabelMap[status] || status
}

// Define helper function inside component
export const getRoleBasePath = (role: string): string => {
  const rolePathMap: Record<string, string> = {
    [ROLE.SYSTEM_ADMIN]: '/admin',
    [ROLE.LAB_ADMIN]: '/lab-admin',
    [ROLE.MENTOR]: '/mentor',
    [ROLE.COMPANY]: '/company-manage',
    [ROLE.USER]: '/talent'
  }
  return rolePathMap[role] || '/talent'
}

export const getAvatarUrl = (fullName: string) => {
  const lastName = getLastNameForAvatar(fullName)
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(lastName)}`
}





