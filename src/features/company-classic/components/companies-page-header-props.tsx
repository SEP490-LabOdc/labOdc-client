import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { getRoleBasePath } from '@/lib/utils'
import { useUser } from '@/context/UserContext'

//export const CompanyPageHeader = ({ companyData }: any) => {
export const CompanyPageHeader = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    // const { isCompany, isLabAdmin } = usePermission()

    const handleGoBack = () => {
        navigate({ to: `${getRoleBasePath(user?.role)}/companies` })
    }

    return (
        <div className="bg-card px-6 lg:px-18 py-4 border-b border-primary/20 flex items-center justify-between">
            <Button
                variant="ghost"
                size="sm"
                onClick={handleGoBack}
                className="hover:bg-muted text-muted-foreground hover:text-foreground"
            >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Quay lại
            </Button>
        </div>
    )
}