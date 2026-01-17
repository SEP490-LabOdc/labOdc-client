import { type CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useSignInWithGoogle } from '@/hooks/api'
import { getRoleBasePath } from '@/lib/utils'
import { extractRoleFromAuthResponse } from '@/hooks/utils/auth-utils'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRef } from 'react'
import googleLogo from '@/assets/google-logo.png'

interface GoogleLoginButtonProps {
    className?: string
    onSuccess?: (credentialResponse: CredentialResponse) => void
    onError?: () => void
    theme?: 'outline' | 'filled_blue' | 'filled_black'
    size?: 'large' | 'medium' | 'small'
    width?: string | number
    auto_select?: boolean
    useCustomButton?: boolean // Use custom button instead of GoogleLogin component
}

/**
 * Component for Google Login with integrated authentication logic
 * Can use either GoogleLogin component (for ID token) or custom button with useGoogleLogin hook
 */
export function GoogleLoginButton({
    className,
    onSuccess,
    onError,
    theme = 'filled_blue',
    size = 'large',
    width = '100%',
    auto_select = false,
    useCustomButton = true, // Default to custom button for full width control
}: GoogleLoginButtonProps) {
    const signInGoogle = useSignInWithGoogle()
    const navigate = useNavigate()
    const googleLoginRef = useRef<HTMLDivElement>(null)

    // Handler for successful authentication with ID token
    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        const idToken = credentialResponse.credential
        if (!idToken) {
            onError?.()
            toast.error('Đăng nhập Google thất bại: Không nhận được ID token')
            return
        }

        await handleSignInWithIdToken(idToken, credentialResponse)
    }

    // Handler for sign in with ID token
    const handleSignInWithIdToken = async (idToken: string, credentialResponse?: CredentialResponse) => {
        signInGoogle.mutate(
            { idToken },
            {
                onSuccess: async (response) => {
                    toast.success(response.message || 'Đăng nhập thành công!')

                    // Extract role from auth response
                    const decodedRole = extractRoleFromAuthResponse(response)

                    // Use getRoleBasePath to get the correct route based on role
                    const basePath = getRoleBasePath(decodedRole || '')
                    const navigateRoute = basePath || '/'

                    // Call custom onSuccess callback if provided
                    if (credentialResponse) {
                        onSuccess?.(credentialResponse)
                    }

                    // Wait a bit to ensure auth state is updated before navigating
                    // This prevents redirect back to sign-in page
                    setTimeout(() => {
                        navigate({ to: navigateRoute as any })
                    }, 100)
                },
                onError: () => {
                    onError?.()
                    toast.error('Đăng nhập thất bại!')
                },
            }
        )
    }

    // Handler for Google Login error
    const handleGoogleLoginError = () => {
        onError?.()
        toast.error('Đăng nhập Google thất bại')
    }

    // Use custom button with hidden GoogleLogin component
    // Clicking custom button will trigger the hidden GoogleLogin button
    const handleCustomButtonClick = () => {
        // Find and click the hidden Google button
        const googleButton = googleLoginRef.current?.querySelector('div[role="button"]') as HTMLElement
        if (googleButton) {
            googleButton.click()
        } else {
            // Fallback: try to find any button inside
            const button = googleLoginRef.current?.querySelector('button') as HTMLElement
            if (button) {
                button.click()
            } else {
                toast.error('Không thể khởi động đăng nhập Google')
            }
        }
    }

    // Custom button with full width
    if (useCustomButton) {
        return (
            <div className={cn('w-full', className)}>
                <Button
                    type="button"
                    onClick={handleCustomButtonClick}
                    disabled={signInGoogle.isPending}
                    size={size === 'large' ? 'lg' : size === 'medium' ? 'default' : 'sm'}
                    className={cn(
                        'w-full flex items-center justify-center gap-3 font-medium',
                        'shadow-md hover:shadow-lg transition-all duration-200',
                        'focus-visible:ring-2 focus-visible:ring-offset-2',
                        theme === 'filled_blue' &&
                        'bg-brand-orange hover:bg-brand-orange/90 active:bg-brand-orange/80 text-white border-0',
                        theme === 'filled_black' &&
                        'bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground border-0',
                        theme === 'outline' &&
                        'bg-background border-2 border-brand-orange hover:border-brand-orange/80 hover:bg-brand-orange/5 active:bg-brand-orange/10 text-brand-orange',
                        size === 'large' && 'h-12 text-base px-6 py-3 rounded-lg',
                        size === 'medium' && 'h-10 text-sm px-5 py-2 rounded-md',
                        size === 'small' && 'h-9 text-xs px-4 py-2 rounded-md',
                        signInGoogle.isPending && 'opacity-70 cursor-not-allowed'
                    )}
                    style={{
                        fontFamily: 'var(--font-roboto), system-ui, sans-serif',
                    }}
                >
                    {signInGoogle.isPending ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Đang xử lý...</span>
                        </>
                    ) : (
                        <>
                            <div className={cn(
                                'flex items-center justify-center',
                                theme === 'outline'
                                    ? 'bg-brand-orange/10 p-1.5 rounded-full shadow-sm'
                                    : 'bg-white/20 p-1.5 rounded-full backdrop-blur-sm'
                            )}>
                                <img
                                    src={googleLogo}
                                    alt="Google"
                                    className={cn(
                                        'object-contain',
                                        size === 'large' && 'w-6 h-6',
                                        size === 'medium' && 'w-5 h-5',
                                        size === 'small' && 'w-4 h-4'
                                    )}
                                    style={{
                                        display: 'block',
                                        imageRendering: 'crisp-edges',
                                    }}
                                />
                            </div>
                            <span className="font-semibold">Đăng nhập với Google</span>
                        </>
                    )}
                </Button>
                {/* Hidden GoogleLogin component to handle OAuth flow */}
                <div ref={googleLoginRef} className="hidden">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        theme={theme}
                        size={size}
                        width={width}
                        auto_select={auto_select}
                    />
                </div>
            </div>
        )
    }

    // Default: Use GoogleLogin component (returns ID token) with full width wrapper
    return (
        <div className={cn('w-full', className)} style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    theme={theme}
                    size={size}
                    width="100%"
                    auto_select={auto_select}
                />
            </div>
        </div>
    )
}
