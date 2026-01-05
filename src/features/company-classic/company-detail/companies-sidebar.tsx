import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getAvatarFallback } from '@/helpers/stringUtils.ts'
import { COMPANY_STATUS_LABEL, type CompanyStatus } from '../data/schema'
import { callTypes } from '../data/data'


interface CompanySidebarProps {
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

export const CompanySidebar: React.FC<CompanySidebarProps> = ({ company }) => {
    const status = company.status as CompanyStatus;
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Thông tin công ty</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-3 text-sm">

                    {/* Các info còn lại */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tên công ty:</span>
                        <span className="font-medium text-gray-800 text-right">{company.name}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-800 text-right">{company.email}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Số điện thoại:</span>
                        <span className="font-medium text-gray-800 text-right">{company.phone}</span>
                    </div>

                    {/* ⭐ STATUS — dùng COMPANY_STATUS_LABEL + callTypes */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Trạng thái:</span>
                        <Badge className={`${callTypes.get(status)} border px-2 py-1 text-xs`}>
                            {COMPANY_STATUS_LABEL[status]}
                        </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Lĩnh vực:</span>
                        <span className="font-medium text-gray-800 text-right">{company.domain || '—'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ngày tạo:</span>
                        <span className="font-medium text-gray-800 text-right">
                            {new Date(company.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                    </div>

                    {/* Contact Person */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Người liên hệ:</span>
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="" />
                                <AvatarFallback>{getAvatarFallback(company.contactPersonName)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-gray-800">{company.contactPersonName}</span>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
