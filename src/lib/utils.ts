import type { NavItem } from "@/components/layout/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

// Hàm getStatusColor đã được refactor
const statusColorMap: Record<string, string> = {
  Completed: 'bg-green-100 text-green-800',
  InProgress: 'bg-purple-100 text-purple-800',
  Pending: 'bg-orange-100 text-orange-800',
  OnHold: 'bg-gray-100 text-gray-800',
  High: 'bg-red-100 text-red-800',
  Paid: 'bg-green-100 text-green-800',
  Hold: 'bg-orange-100 text-orange-800',
  Unpaid: 'bg-red-100 text-red-800',
};

export const getStatusColor = (status: string) => {
  return statusColorMap[status] || 'bg-gray-100 text-gray-800';
};

export const getTagColor = (tag: string) => {
  if (tag.toLowerCase().includes('admin')) {
    return 'bg-pink-100 text-pink-800';
  }
  if (tag.toLowerCase().includes('tech')) {
    return 'bg-blue-100 text-blue-800';
  }
  return 'bg-gray-100 text-gray-800';
};
