import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router';
import { IconPlus } from '@tabler/icons-react';

export function ProjectPrimaryButtons() {
    // const { setOpen } = useUsers();

    const navigate = useNavigate();

    return (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => navigate({ to: '/company-manage/projects/create' })}>
                <span>Tạo dự án mới</span> <IconPlus size={18} />
            </Button>
        </div>
    )
}
