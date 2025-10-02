import React, { useState } from 'react'
import { PasswordInput } from '@/components/password-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Loader2, LogIn } from 'lucide-react'

const formSchema = z.object({
    email: z.email({
        error: (iss) =>
            iss.input === '' ? 'Please enter your email' : undefined
    }),
    password: z.string().min(1, 'Please enter your password').min(7, 'Password must be at least 7 characters long'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match.",
        path: ['confirmPassword'],
    })

export function SignUpForm({ className, ...props }: React.HTMLAttributes<HTMLFormElement>) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true)

        console.log(data)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
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
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder='********' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder='********' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='mt-2 bg-[#2a9d8f]' disabled={isLoading} size='lg'>
                    {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
                    Create account
                </Button>
            </form>
        </Form>
    )
}
