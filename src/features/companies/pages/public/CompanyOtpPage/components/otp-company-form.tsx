import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { useResendOtp, useVerifyOtp } from '@/hooks/api'
import { useSearch } from '@tanstack/react-router'
import { toast } from 'sonner'

const otpSchema = z.object({
    otp: z.string().length(6, { message: "Mã OTP phải có đúng 6 chữ số." }),
});

type OtpFormData = z.infer<typeof otpSchema>;

export function OtpForm() {
    const companyEmail: string = useSearch({ from: '/verify-otp' }).companyEmail

    const verifyOtp = useVerifyOtp()
    const resendOtp = useResendOtp()

    const form = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    const handleResendOtp = async () => {
        try {
            await resendOtp.mutateAsync(companyEmail)
            toast.success('Mã xác thực đã được gửi lại đến email của bạn.')
        } catch (e) {
            console.error(e);
            toast.error('Gửi lại mã xác thực thất bại. Vui lòng thử lại!')
        }
    };

    const onSubmit: SubmitHandler<OtpFormData> = async (data) => {
        try {
            await verifyOtp.mutateAsync({
                otp: data.otp,
                email: companyEmail,
            })
            toast.success('Xác thực thành công!')
        } catch (e) {
            console.error(e);
            toast.error('Xác thực thất bại. Vui lòng thử lại!')
        }
    };

    return (
        <div className="text-center">
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#264653] mb-2">
                    Kiểm tra email của bạn
                </h1>
                <p className="text-base text-gray-600">
                    Chúng tôi đã gửi một mã xác thực gồm 6 chữ số đến địa chỉ email của bạn.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <FormLabel className="w-full text-center text-sm font-medium text-[#264653] ps-16">Mã xác thực</FormLabel>
                                <FormControl>
                                    <div className="flex justify-center">
                                        <InputOTP
                                            maxLength={6}
                                            {...field}
                                            onComplete={form.handleSubmit(onSubmit)}
                                        >
                                            <InputOTPGroup className="gap-2">
                                                {[...Array(6)].map((_, index) => (
                                                    <InputOTPSlot key={index} index={index} className="h-14 w-12 text-lg" />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col items-center">
                        <Button
                            type="submit"
                            className="w-[20.5rem] bg-[#f4a261] hover:bg-[#e76f51] text-white font-semibold py-3 transition-colors duration-200 shadow-lg flex items-center justify-center"
                            disabled={verifyOtp.isPending}
                            size="lg"
                        >
                            {verifyOtp.isPending ? (
                                <>
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    Đang xác thực…
                                </>
                            ) : (
                                <>
                                    Xác thực tài khoản
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <p className="mt-10 text-center text-sm text-gray-600">
                            Không nhận được mã?{' '}
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendOtp.isPending}
                                className="font-semibold text-[#2a9d8f] hover:underline disabled:text-gray-400 disabled:cursor-not-allowed disabled:no-underline"
                            >
                                Gửi lại mã
                            </button>
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    );
}