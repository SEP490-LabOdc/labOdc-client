// import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores/auth-store.ts'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export function ProfileDropdown() {
  const { auth } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      auth.resetTokens()
      await navigate({ to: '/sign-in' })
      toast.success('Đăng xuất thành công!')
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng xuất!')
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='size-10'>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
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
        {/*<DropdownMenuGroup>*/}
        {/*  <DropdownMenuItem asChild>*/}
        {/*    <Link to='/settings'>*/}
        {/*      Profile*/}
        {/*      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
        {/*    </Link>*/}
        {/*  </DropdownMenuItem>*/}
        {/*  <DropdownMenuItem asChild>*/}
        {/*    <Link to='/settings'>*/}
        {/*      Billing*/}
        {/*      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>*/}
        {/*    </Link>*/}
        {/*  </DropdownMenuItem>*/}
        {/*  <DropdownMenuItem asChild>*/}
        {/*    <Link to='/settings'>*/}
        {/*      Settings*/}
        {/*      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
        {/*    </Link>*/}
        {/*  </DropdownMenuItem>*/}
        {/*  <DropdownMenuItem>New Team</DropdownMenuItem>*/}
        {/*</DropdownMenuGroup>*/}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
