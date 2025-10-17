import z from 'zod';
import { useCallback, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Mail, Phone, Building2, User, Upload, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from '@tanstack/react-router'
import { useCompanyRegister } from '@/hooks/api'
import { toast } from 'sonner'
import {
  type IData,
  LocationSelect,
} from '@/features/companies/pages/public/CompanySignUpPage/components/LocationSelect.tsx'
import { useGetProvinces, useGetWardsByProvinceCode } from '@/hooks/api/external'
import { removeProperties } from '@/helpers/objectUtils.ts'
import { combineAddressParts } from '@/helpers/stringUtils.ts'

// --- Schema ---
const schema = z.object({
    //Company fields
    email: z.email("Email công ty không hợp lệ"),
    provinceCode: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
    wardCode: z.string().min(1, "Vui lòng chọn phường/xã"),
    address: z.string().min(1, "Địa chỉ công ty là bắt buộc"),
    taxCode: z.string()
      .min(1, "Vui lòng nhập mã số thuế.")
      .regex(/^[0-9-]+$/, "Mã số thuế chỉ được chứa chữ số và dấu gạch ngang.")
      .transform((val) => val.replace(/-/g, ''))
      .refine(
        (val) => val.length === 10 || val.length === 13,
        {
          message: "Mã số thuế phải có độ dài 10 hoặc 13 chữ số.",
        }
      ),
    name: z.string().min(1, "Tên công ty là bắt buộc"),
    phone: z.string().min(1, "Số điện thoại công ty là bắt buộc"),
    businessLicenseLink: z.instanceof(File).optional().or(z.string().optional()),
    //Personal fields
    contactPersonEmail: z.email("Email cá nhân không hợp lệ"),
    contactPersonName: z.string().min(1, "Họ và tên là bắt buộc"),
    contactPersonPhone: z.string().min(1, "Số điện thoại là bắt buộc"),
    agreeTerm: z.boolean().refine(val => val === true, "Bạn phải đồng ý với các điều khoản")
});

export type CompanySignupData = z.infer<typeof schema>;

export function RegisterCompanyForm() {
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const navigate = useNavigate();

    //Fetching data
    const provinces = useGetProvinces();
    const wards = useGetWardsByProvinceCode(selectedProvince);

    const { mutateAsync, isPending } = useCompanyRegister();

    const form = useForm<CompanySignupData>({
        resolver: zodResolver(schema),
        defaultValues: {
            //Company fields
            name: '',
            email: '',
            phone: '',
            taxCode: '',
            address: '',
            provinceCode: '',
            wardCode: '',
            businessLicenseLink: '',
            //Personal fields
            contactPersonEmail: '',
            contactPersonName: '',
            contactPersonPhone: '',
            agreeTerm: false
        }
    });

    const onSubmit = async (data: CompanySignupData) => {
      try {
        const selectedProvince = provinces.data?.find((p: IData) => p.code === parseInt(data.provinceCode));
        const selectedWard = wards.data?.wards?.find((w: IData) => w.code === parseInt(data.wardCode));
        const addressParts = combineAddressParts(data.address, selectedProvince.name, selectedWard.name);
        const submitData = removeProperties(data, 'agreeTerm', 'wardCode', 'provinceCode');
        const finalSubmitData = {
          ...submitData,
          address: addressParts,
          businessLicenseLink: submitData.businessLicenseLink instanceof File
            ? '' : submitData.businessLicenseLink || ''
        };
        console.log(finalSubmitData);
        await mutateAsync(finalSubmitData)
        await navigate({ to: '/verify-otp', search: { companyEmail: data.email } })
        toast.success('Đăng ký công ty thành công!')
      } catch (e) {
        console.error(e);
      }
    };


    const handleProvinceSelection = useCallback((provinceCode: string) => {
      setSelectedProvince(provinceCode);
      form.setValue('provinceCode', provinceCode);
      form.setValue('wardCode', '');
    }, [form])

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
                            name='name'
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
                            name='taxCode'
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
                            name='email'
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
                            name='phone'
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
                            name='businessLicenseLink'
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

                      {/* Location selectors */}
                          <FormField
                            control={form.control}
                            name="provinceCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-[#264653]">Tỉnh/Thành phố *</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                                    <LocationSelect
                                      data={provinces.data || []}
                                      value={field.value}
                                      onValueChange={handleProvinceSelection}
                                      placeholder="Chọn tỉnh/thành phố"
                                      disabled={provinces.isPending}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="wardCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-[#264653]">Phường/Xã *</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                                    <LocationSelect
                                      data={wards.data?.wards || []}
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      placeholder="Chọn phường/xã"
                                      disabled={!selectedProvince || wards.isPending}
                                    />
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
                            <FormLabel className="text-sm font-medium text-[#264653]">Địa chỉ cụ thể *</FormLabel>
                            <FormControl>
                              <div className='relative'>
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  className="pl-10 border-gray-300 focus:border-[#2a9d8f] focus:ring-[#2a9d8f]"
                                  placeholder='Số nhà, tên đường...'
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
                            name='contactPersonName'
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
                            name='contactPersonEmail'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-[#264653]">Email cá nhân *</FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="contactPersonEmail"
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
                            name='contactPersonPhone'
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
                        disabled={isPending}
                        size="lg"
                    >
                        {isPending ? "Đang gửi…" : "Đăng ký doanh nghiệp"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className='text-center'>Đã có tài khoản <Link to='/company-login' className='text-[#2a9d8f] font-semibold hover:underline'>Đăng nhập ngay</Link></p>

                </div>
            </form>
        </Form>
    )
}
