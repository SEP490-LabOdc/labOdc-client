import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router';
import { getRoleBasePath } from '@/lib/utils';
import { useUser } from '@/context/UserContext';

export function UsersPrimaryButtons() {
    const { user } = useUser();

    const navigate = useNavigate();

    return (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => navigate({ to: getRoleBasePath(user.role) + '/users/create' })}>
                <span>Tạo người dùng mới</span> <UserPlus size={18} />
            </Button>
        </div>
    )
}
