import type { LinkProps } from '@tanstack/react-router'

interface User {
  name: string
  email: string
  avatar: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: any })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarData {
  // user: User
  navGroups: NavGroup[]
}

interface LandingHeader {
  title: string
  url: LinkProps['to']
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink, LandingHeader }
