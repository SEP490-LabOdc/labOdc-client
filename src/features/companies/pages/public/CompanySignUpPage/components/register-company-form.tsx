import React from 'react'
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Mail, Phone, Building2, User, Upload, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from '@tanstack/react-router';

// --- Schema ---
const schema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    taxId: z.string().min(1, "Tax ID is required"),
    companyEmail: z.string().email("Invalid email address"),
    businessLicense: z.instanceof(File).optional().or(z.string().optional()),
    address: z.string().min(1, "Address is required"),
    companyPhone: z.string().min(1, "Company phone number is required"),
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    agreeTerm: z.boolean().refine(val => val === true, "You must agree to the terms")
});

export type CompanySignupData = z.infer<typeof schema>;

export function RegisterCompanyForm() {
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate();

    const form = useForm<CompanySignupData>({
        resolver: zodResolver(schema),
        defaultValues: {
            companyName: '',
            taxId: '',
            companyEmail: '',
            businessLicense: undefined,
            address: '',
            companyPhone: '',
            fullName: '',
            email: '',
            phoneNumber: '',
            agreeTerm: false
        }
    });

    const onSubmit = async (data: CompanySignupData) => {
        setIsLoading(true);
        console.log("Company register:", data);

        // Giả lập gọi API và đăng ký thành công
        setTimeout(() => {
            setIsLoading(false);
            // SỬ DỤNG CÔNG CỤ ĐỂ CHUYỂN TRANG TẠI ĐÂY
            navigate({ to: '/verify-otp' });
        }, 2000);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Section 1: Company Information */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                        <Building2 className="h-5 w-5 text-[#2a9d8f]" />
                        <h3 className="text-lg font-semibold text-[#264653]">Thông tin doanh nghiệp</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name='companyName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#264653]">Tên công ty *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                className="pl-10 border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]"
                                                placeholder='Nhập tên công ty'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='taxId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#264653]">Mã số thuế *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                className="pl-10 border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]"
                                                placeholder='Nhập mã số thuế'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='companyEmail'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#264653]">Email công ty *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="email"
                                                className="pl-10  border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]"
                                                placeholder='company@domain.com'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='companyPhone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#264653]">Số điện thoại công ty *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="tel"
                                                className="pl-10  border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]"
                                                placeholder='(+84) xxx xxx xxx'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='businessLicense'
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="text-sm font-medium text-[#264653]">Giấy phép kinh doanh *</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                {...fieldProps}
                                            />
                                            <div className="flex items-center gap-3 p-3 border border-gray-300  hover:border-[#2a9d8f] transition-colors">
                                                <Upload className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {value instanceof File ? value.name : 'Chọn file (PDF, JPG, PNG)'}
                                                </span>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='address'
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="text-sm font-medium text-[#264653]">Địa chỉ công ty *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Textarea
                                                className="pl-10  border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f] min-h-[80px]"
                                                placeholder='Nhập địa chỉ đầy đủ của công ty'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Section 2: Representative Information */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                        <User className="h-5 w-5 text-[#2a9d8f]" />
                        <h3 className="text-lg font-semibold text-[#264653]">Thông tin người đại diện</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name='fullName'
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="text-sm font-medium text-[#264653]">Họ và tên *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                className="pl-10  border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]"
                                                placeholder='Nhập họ và tên đầy đủ'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#264653]">Email cá nhân *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="email"
                                                className="pl-10  border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]"
                                                placeholder='your.email@domain.com'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='phoneNumber'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#264653]">Số điện thoại *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="tel"
                                                className="pl-10  border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]"
                                                placeholder='(+84) xxx xxx xxx'
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name='agreeTerm'
                        render={({ field }) => (
                            <FormItem className="flex items-start gap-3">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(val) => field.onChange(val === true)}
                                        className="mt-1"
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm leading-relaxed text-gray-600">
                                        Tôi đồng ý với{' '}
                                        <a href="#" className="text-[#2a9d8f] hover:underline font-medium">Điều khoản sử dụng</a>
                                        {' '}và{' '}
                                        <a href="#" className="text-[#2a9d8f] hover:underline font-medium">Chính sách bảo mật</a>
                                        {' '}của LabOdc
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-[#f4a261] hover:bg-[#e76f51] text-white font-semibold py-3  transition-colors duration-200 shadow-lg"
                        disabled={isLoading}
                        size="lg"
                    >
                        {isLoading ? "Đang gửi…" : "Đăng ký doanh nghiệp"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className='text-center'>Đã có tài khoản <Link to='/company-login' className='text-[#2a9d8f] font-semibold hover:underline'>Đăng nhập ngay</Link></p>

                </div>
            </form>
        </Form>
    )
}
