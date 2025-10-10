import React, { useState, useEffect } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowRight, LoaderCircle } from 'lucide-react';

const otpSchema = z.object({
    otp: z.string().length(6, { message: "Mã OTP phải có đúng 6 chữ số." }),
});

type OtpFormData = z.infer<typeof otpSchema>;

export function OtpForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const form = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    });

    const handleResendOtp = () => {
        console.log("Đang gửi lại OTP...");
        setCountdown(60);
    };

    const onSubmit: SubmitHandler<OtpFormData> = (data) => {
        setIsLoading(true);
        console.log("Đang xác thực OTP:", data.otp);

        setTimeout(() => {
            if (data.otp === '123456') { // Giả lập mã đúng
                alert(`Xác thực thành công với mã: ${data.otp}`);
            } else {
                alert("Mã OTP không chính xác.");
                form.setError("otp", { message: "Mã không hợp lệ." });
            }
            setIsLoading(false);
        }, 2000);
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
                                <FormLabel className="w-full text-center text-sm font-medium text-[#264653]">Mã xác thực</FormLabel>
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
                            disabled={isLoading}
                            size="lg"
                        >
                            {isLoading ? (
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
                                disabled={countdown > 0 || isLoading}
                                className="font-semibold text-[#2a9d8f] hover:underline disabled:text-gray-400 disabled:cursor-not-allowed disabled:no-underline"
                            >
                                {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại mã'}
                            </button>
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    );
}