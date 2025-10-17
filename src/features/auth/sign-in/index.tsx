import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import { useSearch } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import ggLogo from '@/assets/google-logo.png'

export default function SignIn() {
    const { redirect } = useSearch({ from: '/(auth)/sign-in/' })

    return (
        <AuthLayout>
            <div className='gap-4'>
                <div className=''>
                    <h1 className='text-2xl text-[#2a9d8f] font-bold mb-2'>Chào mừng bạn đã quay trở lại</h1>
                    <p className='text-md text-muted-foreground'>Hãy biến kiến thức thành trải nghiệm thực tế cùng các dự án doanh nghiệp.</p>
                </div>
                <Button
                    variant="outline"
                    size='lg'
                    className="w-full text-lg my-4 px-8 py-4 border-2 border-[#2a9d8f] text-[#2a9d8f] hover:bg-[#2a9d8f] hover:text-white font-semibold transition-all duration-300 bg-transparent"
                >
                    <img src={ggLogo} alt="google logo" className='w-4 h-4' />
                    Đăng nhập với Google
                </Button>
                <UserAuthForm redirectTo={redirect} />
            </div>
        </AuthLayout>
    )
}

