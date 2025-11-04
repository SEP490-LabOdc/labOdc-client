import { useCallback, useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { ArrowRight, Mail, Phone, Building2, User, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@tanstack/react-router'
import {
  type IData,
  LocationSelect,
} from '@/features/companies/pages/public/CompanySignUpPage/components/LocationSelect.tsx'
import { useGetProvinces, useGetWardsByProvinceCode } from '@/hooks/api/external'
import { removeProperties } from '@/helpers/objectUtils.ts'
import {
  combineAddressParts,
  findProvinceCodeByName,
  findWardCodeByName,
  parseAddressParts,
} from '@/helpers/stringUtils.ts'
import {
  type CompanyRegisterData, companySchema,
} from '@/features/companies/pages/public/CompanySignUpPage/components/company-register.schema.ts'
import type { CompanyCreatePayload, CompanyPayload, CompanyUpdateRegister } from '@/features/companies/types.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileUpload } from '@/features/companies/pages/public/CompanySignUpPage/components/FileUpload.tsx'

interface RegisterCompanyFormProps {
  initialData?: CompanyUpdateRegister;
  submitButtonText?: string;
  onSubmit: (data: CompanyCreatePayload | CompanyPayload) => Promise<void>;
  isLoading: boolean;
}

export function RegisterCompanyForm({
    initialData,
    submitButtonText = "Lưu thông tin",
    onSubmit,
    isLoading
}: RegisterCompanyFormProps) {
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [uploadedFileName, setUploadedFileName] = useState<string>('');

    // Get existing business license file info
    const existingBusinessLicense = initialData?.getCompanyDocumentEditResponses?.find(
      doc => doc.type === 'BUSINESS_LICENSE' || doc.fileUrl === initialData?.businessLicenseLink
    );

    //Fetching data
    const provinces = useGetProvinces();
    const wards = useGetWardsByProvinceCode(selectedProvince);

    const form = useForm<CompanyRegisterData>({
      resolver: zodResolver(companySchema),
      defaultValues: {
        //Company fields
        name: initialData?.companyName || '',
        email: initialData?.companyEmail || '',
        phone: initialData?.companyPhone || '',
        taxCode: initialData?.taxCode || '',
        address: initialData?.address || '',
        provinceCode: '',
        wardCode: '',
        businessLicenseLink: existingBusinessLicense?.fileUrl || '',
        businessLicenseFileName: existingBusinessLicense?.fileName || '',
        //Personal fields
        contactPersonEmail: initialData?.contactPersonEmail || '',
        contactPersonName: initialData?.contactPersonName || '',
        contactPersonPhone: initialData?.contactPersonPhone || '',
        agreeTerm: false
      }
    });

    // Set initial filename from existing data
    useEffect(() => {
      if (existingBusinessLicense?.fileName) {
        setUploadedFileName(existingBusinessLicense.fileName);
      }
    }, [existingBusinessLicense]);

    // Effect to populate form when initialData and provinces are loaded
    useEffect(() => {
      if (initialData?.address && provinces.data?.length > 0) {

        const { street, province } = parseAddressParts(initialData?.address);
        const provinceCode = findProvinceCodeByName(province, provinces.data);
        if (provinceCode) {
          setSelectedProvince(provinceCode);
          form.setValue('provinceCode', provinceCode);
        }

        // Set street address
        form.setValue('address', street);
      }
    }, [initialData?.address, provinces.data, form]);

    // Effect to set ward when wards are loaded
    useEffect(() => {
      if (initialData?.address && wards.data?.wards?.length > 0) {
        const { ward } = parseAddressParts(initialData?.address);
        const wardCode = findWardCodeByName(ward, wards.data.wards);

        if (wardCode) {
          form.setValue('wardCode', wardCode);
        }
      }
    }, [initialData?.address, wards.data, form]);

    const handleSubmit = async (data: CompanyRegisterData) => {
        const selectedProvince = provinces.data?.find((p: IData) => p.code === parseInt(data.provinceCode));
        const selectedWard = wards.data?.wards?.find((w: IData) => w.code === parseInt(data.wardCode));
        const addressParts = combineAddressParts(data.address, selectedWard.name, selectedProvince.name);
        const submitData = removeProperties(data, 'agreeTerm', 'wardCode', 'provinceCode');

        // Check if this is an update operation (initialData exists)
        if (initialData) {
          // Update payload structure
          const updatePayload = {
            name: data.name,
            phone: data.phone,
            taxCode: data.taxCode,
            address: addressParts,
            contactPersonName: data.contactPersonName,
            contactPersonPhone: data.contactPersonPhone,
            contactPersonEmail: data.contactPersonEmail,
            updateCompanyDocumentRequests: [
              {
                id: existingBusinessLicense?.id,
                fileName: uploadedFileName || existingBusinessLicense?.fileName || data.businessLicenseFileName,
                fileUrl: data.businessLicenseLink,
                type: "BUSINESS_LICENSE"
              }
            ]
          };
          await onSubmit(updatePayload);
        } else {
          // Create payload structure (original)
          const finalSubmitData = {
            ...submitData,
            address: addressParts,
            businessLicenseLink: data.businessLicenseLink,
            businessLicenseFileName: uploadedFileName || data.businessLicenseFileName
          };
          await onSubmit(finalSubmitData);
        }
    };

    const handleProvinceSelection = useCallback((provinceCode: string) => {
      setSelectedProvince(provinceCode);
      form.setValue('provinceCode', provinceCode);
      form.setValue('wardCode', '');
    }, [form])
  


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                                                disabled={!!initialData?.companyEmail}
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
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="text-sm font-medium text-[#264653]">
                              Giấy phép kinh doanh *
                            </FormLabel>
                            <FormControl>
                              <FileUpload
                                value={field.value}
                                onChange={field.onChange}
                                onFileUploaded={(fileName) => {
                                  setUploadedFileName(fileName);
                                  form.setValue('businessLicenseFileName', fileName);
                                }}
                                accept=".pdf,.jpg,.jpeg,.png"
                                maxSize={10}
                                placeholder="Chọn file giấy phép kinh doanh"
                                disabled={isLoading}
                                existingFileName={existingBusinessLicense?.fileName} // Pass existing filename
                              />
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
                        disabled={isLoading}
                        size="lg"
                    >
                        {isLoading ? "Đang gửi…" : `${ submitButtonText }`}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className='text-center'>Đã có tài khoản <Link to='/company-login' className='text-[#2a9d8f] font-semibold hover:underline'>Đăng nhập ngay</Link></p>

                </div>
            </form>
        </Form>
    )
}
