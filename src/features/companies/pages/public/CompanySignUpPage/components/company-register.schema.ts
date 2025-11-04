import z from 'zod';

export const companySchema = z.object({
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
  phone: z.string()
    .min(1, "Số điện thoại công ty là bắt buộc")
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'Số điện thoại không hợp lệ'),
  businessLicenseLink: z.string().min(1, "Vui lòng tải lên giấy phép kinh doanh"),
  businessLicenseFileName: z.string().optional(),
  //Personal fields
  contactPersonEmail: z.email("Email cá nhân không hợp lệ"),
  contactPersonName: z.string().min(1, "Họ và tên là bắt buộc"),
  contactPersonPhone: z.string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, 'Số điện thoại không hợp lệ'),
  agreeTerm: z.boolean().refine(val => val === true, "Bạn phải đồng ý với các điều khoản")
});

export type CompanyRegisterData = z.infer<typeof companySchema>;
