import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { cn, getRoleBasePath } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, LogIn } from 'lucide-react'
import { PasswordInput } from '@/components/password-input'
import { toast } from 'sonner'
import { useSignIn } from '@/hooks/api/auth'
import { extractRoleFromAuthResponse } from '@/hooks/utils/auth-utils'

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Please enter your email' : undefined),
  }),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu phải dài ít nhất 8 ký tự'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const signIn = useSignIn()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    signIn.mutate(data, {
      onSuccess: async (res) => {
        toast.success('Đăng nhập thành công!')

        // Extract role from auth response
        const decodedRole = extractRoleFromAuthResponse(res)

        // Use getRoleBasePath to get the correct route based on role
        const basePath = getRoleBasePath(decodedRole || '')
        const navigateRoute = basePath || '/'

        // Wait a bit to ensure auth state is updated before navigating
        // This prevents redirect back to sign-in page
        setTimeout(() => {
          navigate({ to: navigateRoute as any })
        }, 100)
      },
      onError: () => {
        toast.error('Đăng nhập thất bại!')
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2 font-medium">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to="/forgot-password"
                className="text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:text-secondary transition-colors duration-200"
              >
                Quên mật khẩu?
              </Link>
            </FormItem>
          )}
        />
        <Button
          className="mt-2 bg-brand-orange hover:bg-brand-orange/90 active:bg-brand-orange/80 text-white shadow-md hover:shadow-lg transition-all duration-200"
          disabled={signIn.isPending}
          size="lg"
        >
          {signIn.isPending ? <Loader2 className="animate-spin" /> : <LogIn />}
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
