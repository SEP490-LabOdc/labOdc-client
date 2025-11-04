export type UserLoginPayload = {
  email: string,
  password: string,
}

export type UserLoginGooglePayload = {
  "idToken": string,
}

export type TCompanyRegisterDTO = {
  // Create payload
  address: string;
  businessLicenseLink: string;
  businessLicenseFileName?: string;
  email: string;
  taxCode: string;
  name: string;
  phone: string;
  contactPersonEmail: string;
  contactPersonName: string;
  contactPersonPhone: string;
} | {
  // Update payload
  name: string;
  phone: string;
  taxCode: string;
  address: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  updateCompanyDocumentRequests: Array<{
    id?: string;
    fileName?: string;
    fileUrl: string;
    type: string;
  }>;
};

export type TRefreshTokenDTO = {
  userId: string;
  refreshToken: string;
}
