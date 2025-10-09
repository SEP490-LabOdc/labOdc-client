import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu'
import { Palette, UserCog2, Wrench } from 'lucide-react'

export function ProfileDropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='size-10'>
            <AvatarImage src='https://www.anhnghethuatdulich.com/wp-content/uploads/2025/08/jack-meme-joker-pha-tron-giua-hai-huoc-va-phong-cach-doc-dao.jpg' alt='@shadcn' />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>satnaing</p>
            <p className='text-muted-foreground text-xs leading-none'>
              satnaingdev@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/admin/settings'>
              <UserCog2 />
              Hồ sơ
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/admin/settings/account'>
              <Wrench />
              Tài khoản
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/admin/settings/appearance'>
              <Palette />
              Giao diện
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Đăng xuất
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
