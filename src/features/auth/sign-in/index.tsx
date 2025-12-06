import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useSignInWithGoogle } from '@/hooks/api'
import { type CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { toast } from 'sonner'

export default function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in/' })
  const signInGoogle = useSignInWithGoogle()
  const navigate = useNavigate()

  const handleSignInWithGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential
    if (idToken) {
      signInGoogle.mutate({ idToken }, {
        onSuccess: async (response) => {
          toast.success(response.message);
          await navigate({ to: redirect });
        },
      });
    }
  }

  const handleSignInWithGoogleFailed = (): void => {
    toast.error('Đăng nhập Google thất bại');
  }

  return (
    <AuthLayout>
      <div className='gap-4'>
        <div className='mb-4'>
          <h1 className='text-2xl text-[#2a9d8f] font-bold mb-2'>
            Chào mừng bạn đã quay trở lại
          </h1>
          <p className='text-md text-muted-foreground'>
            Hãy biến kiến thức thành trải nghiệm thực tế cùng các dự án doanh nghiệp.
          </p>
        </div>

        <div className="relative">
          <GoogleLogin
            onSuccess={handleSignInWithGoogleSuccess}
            onError={handleSignInWithGoogleFailed}
            theme={"filled_blue"}
            width={"100%"}
            size={"large"}
          />
        </div>

        <UserAuthForm redirectTo={redirect} />
      </div>
    </AuthLayout>
  )
}
