import { useUser } from '@/context/UserContext'
import { useAuthStore } from '@/stores/auth-store.ts'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { getAvatarFallback } from '@/helpers/stringUtils.ts'
import { Palette, UserCog2, Wrench } from 'lucide-react'
// Define helper function inside component

import { getRoleBasePath } from '@/lib/utils.ts'

export function ProfileDropdown() {
  const logout = useAuthStore(state => state.logout)
  const navigate = useNavigate()
  const { user } = useUser()

  const handleLogout = async () => {
    logout()
    await navigate({ to: '/sign-in' })
    toast.success('Đăng xuất thành công!')
  }

  const handleNavigation = (path: string) => {
    window.location.href = path
  }

  if (!user) {
    return (
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="size-10">
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  const basePath = getRoleBasePath(user.role)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="size-10">
            <AvatarImage src={user.avatarUrl} alt="user" />
            <AvatarFallback>{getAvatarFallback(user.fullName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.fullName}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleNavigation(`${basePath}/settings`)}>
            <UserCog2 />
            Hồ sơ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation(`${basePath}/settings/account`)}>
            <Wrench />
            Tài khoản
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation(`${basePath}/settings/appearance`)}>
            <Palette />
            Giao diện
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Đăng xuất
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
