import React from 'react'
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Globe, Mail, Phone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

// --- Schema ---
const schema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    workEmail: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    website: z.string().optional(),
    industry: z.string().min(1, "Industry is required"),
    address: z.string().min(1, "Address is required"),
    about: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agree: z.boolean().refine(val => val === true, "You must agree to the terms")
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});


export type EmployerSignupData = z.infer<typeof schema>;

export function RegisterCompanyForm() {
    const [isLoading, setIsLoading] = React.useState(false)

    const form = useForm<EmployerSignupData>({
        resolver: zodResolver(schema),
        defaultValues: {
            companyName: '',
            workEmail: '',
            phone: '',
            website: '',
            industry: '',
            address: '',
            about: '',
            password: '',
            confirmPassword: '',
            agree: false
        }
    });


    const onSubmit = async (data: EmployerSignupData) => {
        setIsLoading(true)
        console.log("Employer register:", data);
        setTimeout(() => {
            alert("Đăng ký thành công! Hãy kiểm tra email để kích hoạt tài khoản.");
            setIsLoading(false)
        }, 3000)
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name='companyName'
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Tên công ty</FormLabel>
                            <FormControl>
                                <Input placeholder='VD: Fusion Lab Co., Ltd' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='workEmail'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email công việc</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9" placeholder='hr@company.com' {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9" placeholder='(+84) 912 345 678' {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='website'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website (tuỳ chọn)</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9" placeholder='https://company.com' {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='industry'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngành</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Chọn ngành" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="software">Phần mềm</SelectItem>
                                    <SelectItem value="fintech">FinTech</SelectItem>
                                    <SelectItem value="ecommerce">E‑commerce</SelectItem>
                                    <SelectItem value="game">Game/3D</SelectItem>
                                    <SelectItem value="ai">AI/ML</SelectItem>
                                    <SelectItem value="iot">IoT/Embedded</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                                <Input placeholder='Số, đường, phường, quận, TP' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='about'
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Giới thiệu (tuỳ chọn)</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Mô tả ngắn về sản phẩm, tech-stack, văn hoá…' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='agree'
                    render={({ field }) => (
                        <FormItem className="md:col-span-2 flex items-start gap-3">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={(val) => field.onChange(val === true)} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm leading-relaxed text-muted-foreground">Tôi đồng ý với <a className="underline" href="#" onClick={(e) => e.preventDefault()}>Điều khoản dịch vụ</a> và <a className="underline" href="#" onClick={(e) => e.preventDefault()}>Chính sách bảo mật</a> của LabOdc.</FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <div className="md:col-span-2 flex gap-3">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Đang gửi…" : "Đăng ký nhà tuyển dụng"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    )
}
