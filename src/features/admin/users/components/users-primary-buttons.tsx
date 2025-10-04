import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { useUsers } from './users-provider'
import { useNavigate } from '@tanstack/react-router';

export function UsersPrimaryButtons() {
    // const { setOpen } = useUsers();

    const navigate = useNavigate();

    return (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => navigate({ to: '/admin/users/create' })}>
                <span>Tạo người dùng mới</span> <UserPlus size={18} />
            </Button>
        </div>
    )
}
