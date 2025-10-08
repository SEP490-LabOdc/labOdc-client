import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores/auth-store'
import { Link, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { cn, sleep } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, LogIn } from 'lucide-react'
import { PasswordInput } from '@/components/password-input'


const formSchema = z.object({
    email: z.email({
        error: (iss) => (iss.input === '' ? 'Please enter your email' : undefined),
    }),
    password: z
        .string()
        .min(1, 'Please enter your password')
        .min(7, 'Password must be at least 7 characters long'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
    redirectTo?: string
}

export function UserAuthForm({
    className,
    redirectTo,
    ...props
}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { auth } = useAuthStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true)

        const mockUser = {
            accountNo: 'ACC001',
            email: data.email,
            role: ['user'],
            exp: Date.now() + 24 * 60 * 60 * 1000, //24 hours from now
        }

        toast.promise(sleep(2000), {
            loading: 'Đang dăng nhập...',
            success: () => {
                setIsLoading(false)

                //Set user and access token
                auth.setUser(mockUser)
                auth.setAccessToken('mock-access-token')

                //Redirect to the stored location or default to dashboard
                const targetPath = redirectTo || '/'
                navigate({ to: targetPath, replace: true })

                return `Welcome back, ${data.email}`
            },
            error: 'Error',
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('grid gap-3', className)}
                {...props}
            >
                <div className='relative my-2'>
                    <div className='absolute inset-0 flex items-center'>
                        <span className='w-full border-t' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                        <span className='bg-background text-muted-foreground px-2'>
                            Or continue with
                        </span>
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='name@example.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem className='relative'>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder='********' {...field} />
                            </FormControl>
                            <FormMessage />
                            <Link
                                to='/forgot-password'
                                className='text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75'
                            >
                                Quên mật khẩu?
                            </Link>
                        </FormItem>
                    )}
                />
                <Button className='mt-2 bg-[#2a9d8f]' disabled={isLoading} size='lg'>
                    {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
                    Đăng nhập
                </Button>
            </form>
        </Form>
    )
}
