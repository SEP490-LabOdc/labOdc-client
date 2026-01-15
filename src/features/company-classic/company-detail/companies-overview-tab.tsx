import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FileText, User, CircleDotDashed, Globe, Mail, Smartphone, MapPin, LinkIcon, Building2 } from 'lucide-react'
import { getAvatarFallback } from '@/helpers/stringUtils.ts'
import { COMPANY_STATUS_LABEL, type CompanyStatus } from '../data/schema'
import { callTypes } from '../data/data'

interface CompanyOverviewTabProps {
    company: {
        id: string
        name: string
        email: string
        phone: string
        taxCode: string
        address: string
        description?: string
        website?: string
        status: string
        domain?: string
        userId: string
        contactPersonName: string
        contactPersonEmail: string
        contactPersonPhone: string
        createdAt: string
    }
}

export const CompanyOverviewTab: React.FC<CompanyOverviewTabProps> = ({ company }) => {
    const status = company.status as CompanyStatus;
    return (
        <Card>
            <CardContent className="p-6 space-y-6">

                {/* Header */}
                <div className="flex items-start gap-4">
                    <Building2 className="h-10 w-10 text-blue-600 shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold">{company.name}</h2>
                        <p className="text-sm text-gray-500">Mã công ty: {company.id.slice(0, 8)}</p>
                    </div>
                </div>

                <div className="space-y-5 pt-4 border-t">

                    {/* Status */}
                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <CircleDotDashed className="h-4 w-4" />
                            <span>Trạng thái</span>
                        </div>
                        <div className="flex-1">
                            <Badge className={`${callTypes.get(status)} border px-2 py-1 text-xs`}>
                                {COMPANY_STATUS_LABEL[status]}
                            </Badge>
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                        </div>
                        <div className="flex-1 text-sm font-medium">{company.email}</div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <Smartphone className="h-4 w-4" />
                            <span>Điện thoại</span>
                        </div>
                        <div className="flex-1 text-sm font-medium">{company.phone}</div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>Địa chỉ</span>
                        </div>
                        <div className="flex-1 text-sm font-medium">{company.address}</div>
                    </div>

                    {/* Website */}
                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <Globe className="h-4 w-4" />
                            <span>Website</span>
                        </div>
                        <div className="flex-1 text-sm font-medium">
                            {company.website || '—'}
                        </div>
                    </div>

                    {/* Domain */}
                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <LinkIcon className="h-4 w-4" />
                            <span>Domain</span>
                        </div>
                        <div className="flex-1 text-sm font-medium">
                            {company.domain || '—'}
                        </div>
                    </div>

                    {/* Contact Person */}
                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            <span>Người liên hệ</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 w-fit">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        {getAvatarFallback(company.contactPersonName)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm text-gray-800">
                                    {company.contactPersonName}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <FileText className="h-4 w-4" />
                            <span>Mô tả</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {company.description || 'Không có mô tả'}
                            </p>
                        </div>
                    </div>

                    {/* Created At */}
                    <div className="flex items-start">
                        <div className="w-40 shrink-0 flex items-center gap-3 text-sm text-gray-600">
                            <FileText className="h-4 w-4" />
                            <span>Ngày tạo</span>
                        </div>
                        <div className="flex-1 text-sm font-medium">
                            {new Date(company.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
