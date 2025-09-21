import React from 'react'

type AuthLayoutProps = {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className='container grid max-w-none items-center justify-center my-20'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[580px] sm:p-8'>
                {children}
            </div>
        </div>
    )
}
