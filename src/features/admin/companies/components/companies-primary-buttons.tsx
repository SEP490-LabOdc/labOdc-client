import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCompanies } from './companies-provider'
import { useNavigate } from '@tanstack/react-router';

export function CompaniesPrimaryButtons() {
    const { setOpen } = useCompanies();

    const navigate = useNavigate();

    return (
        <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => navigate({ to: '/admin/companies/create' })}>
                <span>Tạo công ty</span> <UserPlus size={18} />
            </Button>
        </div>
    )
}
