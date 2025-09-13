import React from 'react'
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
                    <p className='text-sm'>
                        By clicking sign in, you agree to our{' '}
                        <a
                            href='/terms'
                            className='hover:text-primary underline underline-offset-4'
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href='/privacy'
                            className='hover:text-primary underline underline-offset-4'
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
                <Button
                    variant="outline"
                    size='lg'
                    className="w-full text-lg my-4 px-8 py-4 border-2 border-[#2a9d8f] text-[#2a9d8f] hover:bg-[#2a9d8f] hover:text-white font-semibold transition-all duration-300 bg-transparent"
                >
                    <img src={ggLogo} alt="google logo" className='w-4 h-4' />
                    Sign In with Google
                </Button>
                <UserAuthForm redirectTo={redirect} />
            </div>
        </AuthLayout>
    )
}
