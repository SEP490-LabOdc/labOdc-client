import type { Company } from "../types";
import { fetchCompanies } from "./fetchCompanies";

export const findCompanyById = (companyId: string): Company | undefined => {
    return fetchCompanies().find((company) => company.id === companyId)
}