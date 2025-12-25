import React from 'react'
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@tanstack/react-router';

// Schema validation cho form đăng nhập
// (Đặt rememberMe là bắt buộc để input = output, tránh lỗi TS2322)
const schema = z.object({
    email: z.string().email("Địa chỉ email không hợp lệ"),
    password: z.string().min(1, "Mật khẩu không được để trống"),
    rememberMe: z.boolean(),
});

export type CompanyLoginData = z.infer<typeof schema>;

export function LoginCompanyForm() {
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<CompanyLoginData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: CompanyLoginData) => {
        setIsLoading(true);
        console.log("Company login:", data);

        // TODO: Thay thế bằng lời gọi API đăng nhập thật
        setTimeout(() => {
            alert("Đăng nhập thành công!");
            setIsLoading(false);
        }, 2000);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground">Email công ty *</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        className="pl-10 border-input focus:border-secondary focus:ring-secondary"
                                        placeholder='congty@email.com'
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password Field */}
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-foreground">Mật khẩu *</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="password"
                                        className="pl-10 border-input focus:border-secondary focus:ring-secondary"
                                        placeholder='Nhập mật khẩu của bạn'
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                    <FormField
                        control={form.control}
                        name='rememberMe'
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={!!field.value}
                                        // Radix Checkbox trả về CheckedState (boolean | "indeterminate")
                                        onCheckedChange={(checked) => field.onChange(checked === true)}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-foreground/80">
                                    Ghi nhớ đăng nhập
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <Link
                        to="/forgot-password"
                        className="text-sm text-secondary hover:underline font-medium"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                {/* Submit Button */}
                <div className="space-y-4 pt-4">
                    <Button
                        type="submit"
                        className="w-full bg-[#f4a261] hover:bg-[#e76f51] text-white font-semibold py-3 transition-colors duration-200 shadow-lg"
                        disabled={isLoading}
                        size="lg"
                    >
                        {isLoading ? "Đang xử lý…" : "Đăng nhập"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className='text-center text-sm'>
                        Chưa có tài khoản?{' '}
                        <Link to='/company-register' className='text-[#2a9d8f] font-semibold hover:underline'>
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    )
}
