export type UserLoginPayload = {
  email: string,
  password: string,
}

export type TCompanyRegisterDTO = {
  address: string,
  contactPersonEmail: string,
  contactPersonName: string,
  contactPersonPhone: string,
  email: string,
  name: string,
  phone: string,
  taxCode: string,
  businessLicenseLink?: string
}
