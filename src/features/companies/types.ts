export type Company = {
    id: string
    name: string
    logoUrl?: string
    coverUrl?: string
    industry: "IT Services" | "Fintech" | "E-commerce" | "Game" | "AI/ML" | "Other"
    location: string
    rating: number
    reviews: number
    bio: string
    openProjects: number
    collaboratedTalents: number
    isFollowed: boolean
    website?: string
    email?: string
    foundedYear?: number
}

export type CompanyPayload = {
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

export type CompanyCreatePayload = {
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
}

export type CompanyUpdateRegister = {
  companyName: string,
  companyEmail: string,
  companyPhone: string,
  taxCode: string,
  address: string,
  businessLicenseLink: string,
  contactPersonName: string,
  contactPersonEmail: string,
  contactPersonPhone: string,
  getCompanyDocumentEditResponses: CompanyDocument[]
}

type CompanyDocument = {
  id: string,
  fileName: string,
  fileUrl: string,
  type: string
}