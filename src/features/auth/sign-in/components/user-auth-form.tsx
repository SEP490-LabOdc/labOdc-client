import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, LogIn } from 'lucide-react'
import { PasswordInput } from '@/components/password-input'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store.ts'
import { useSignIn } from '@/hooks/api/auth'
import { jwtDecode } from 'jwt-decode'

interface UserInfo {
  role: string,
  userId: string,
  sub: string,
  iat: number,
  exp: number
}

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
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    signIn.mutate(data, {
      onSuccess: async (data) => {
        auth.setTokens(data.data.accessToken, data.data.refreshToken)
        const user: UserInfo = jwtDecode(data.data.accessToken)
        localStorage.setItem('user_id', user.userId)
        toast.success('Đăng nhập thành công!')
        await navigate({ to: '/' })
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
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
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
                className="text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75"
              >
                Quên mật khẩu?
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2 bg-[#2a9d8f]" disabled={signIn.isPending} size="lg">
          {signIn.isPending ? <Loader2 className="animate-spin" /> : <LogIn />}
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
