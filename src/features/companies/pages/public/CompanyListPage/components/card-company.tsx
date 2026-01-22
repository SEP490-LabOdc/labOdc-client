import { Card, CardContent } from '@/components/ui/card';
import { Globe, Mail, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Company } from '@/hooks/api/companies/types';
import { COMPANY_LOGO_DEFAULT, COMPANY_BANNER_DEFAULT } from '@/const';

export function CardCompany({ company }: { company: Company }) {
    return (
        <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden p-0">
            <div className="relative w-full h-48">
                {/* Banner Image */}
                <img
                    src={company.banner || COMPANY_BANNER_DEFAULT}
                    alt={`Banner ${company.name}`}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

                {/* Company Logo */}
                <div className="absolute bottom-0 left-6 z-10 transform translate-y-1/2">
                    <Link
                        to='/companies/$companyId'
                        params={{ companyId: company.id }}
                        className="h-14 w-14 rounded-md overflow-hidden border border-gray-200 bg-white shadow-md flex items-center justify-center"
                    >
                        <img
                            src={company.logo || COMPANY_LOGO_DEFAULT}
                            alt={`${company.name} logo`}
                            className="h-14 w-14 object-contain"
                        />
                    </Link>
                </div>
            </div>

            <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                    <Link
                        to='/companies/$companyId'
                        params={{ companyId: company.id }}
                        className="font-semibold text-lg truncate hover:underline"
                    >
                        {company.name}
                    </Link>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{company.address}</span>
                </div>

                {company.website && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <Globe className="h-4 w-4" />
                        <span className="truncate">{company.website}</span>
                    </div>
                )}

                {company.email && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{company.email}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

