'use client'

import { useEffect, useState } from 'react'
import type { JSX } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useNavigate } from '@tanstack/react-router'
import type { Company } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'

const CHECKLIST_ITEMS = [
    {
        id: 'taxId',
        label: 'Mã số thuế (MST)',
        hints: [
            'Đúng định dạng (10 hoặc 13 số).',
            'Không trùng trong hệ thống.',
            'Tra cứu trên Tổng cục Thuế (API/website) để chắc chắn tồn tại.',
            'Trạng thái hoạt động = "Còn hoạt động".',
        ],
    },
    {
        id: 'companyName',
        label: 'Tên công ty',
        hints: [
            'Khớp với tên trong dữ liệu tra cứu thuế.',
            'Không chứa ký tự đặc biệt/bất thường.',
        ],
    },
    {
        id: 'businessLicense',
        label: 'Giấy phép đăng ký kinh doanh (BRN/GPKD)',
        hints: [
            'Có bản scan/ảnh upload.',
            'Số GPKD khớp với thông tin trên cổng đăng ký doanh nghiệp quốc gia.',
        ],
    },
    {
        id: 'foundingDate',
        label: 'Ngày thành lập',
        hints: ['Hợp lý (không lớn hơn ngày hiện tại).', 'Có trong giấy phép.'],
    },
] as const

const STATUS_LABELS: Record<string, string> = {
    approving: 'Chờ phê duyệt',
    rejected: 'Từ chối phê duyệt',
    active: 'Đang hoạt động',
    inactive: 'Không hoạt động',
    suspended: 'Đã tạm khóa',
}

type ChecklistKey = (typeof CHECKLIST_ITEMS)[number]['id']
type ChecklistState = Record<ChecklistKey, boolean>
type CompanyWithVerification = Company & {
    verification?: Partial<Record<ChecklistKey, boolean>>
}

export default function CompanyApprovingForm({
    initialData,
}: {
    initialData?: CompanyWithVerification
}): JSX.Element {
    const navigate = useNavigate()

    const buildInitialChecklist = (): ChecklistState => ({
        taxId: Boolean(initialData?.verification?.taxId),
        companyName: Boolean(initialData?.verification?.companyName),
        businessLicense: Boolean(initialData?.verification?.businessLicense),
        foundingDate: Boolean(initialData?.verification?.foundingDate),
    })

    const [verification, setVerification] = useState<ChecklistState>(buildInitialChecklist)
    const [requestDialogOpen, setRequestDialogOpen] = useState(false)
    const [requestNote, setRequestNote] = useState('')

    useEffect(() => {
        setVerification(buildInitialChecklist())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        initialData?.verification?.taxId,
        initialData?.verification?.companyName,
        initialData?.verification?.businessLicense,
        initialData?.verification?.foundingDate,
    ])

    useEffect(() => {
        if (!requestDialogOpen) setRequestNote('')
    }, [requestDialogOpen])

    const persistVerification = async (
        updated: ChecklistState,
        previous: ChecklistState
    ) => {
        if (!initialData?.id) return

        try {
            // await fetch(`/api/companies/${initialData.id}`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ verification: updated }),
            // })
            // TODO: handle non-ok responses
        } catch (error: any) {
            setVerification(previous)
            alert(error?.message ?? 'Đã xảy ra lỗi, vui lòng thử lại.')
        }
    }

    const handleToggle = (key: ChecklistKey, checked: boolean) => {
        setVerification((prev) => {
            const updated = { ...prev, [key]: checked }
            void persistVerification(updated, prev)
            return updated
        })
    }

    const handleSendRequest = async () => {
        if (!initialData?.id) {
            setRequestDialogOpen(false)
            return
        }

        try {
            // await fetch(`/api/companies/${initialData.id}/request-update`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         pendingChecklist: uncheckedItems.map((item) => item.id),
            //         note: requestNote,
            //     }),
            // })
            setRequestDialogOpen(false)
        } catch (error: any) {
            alert(error?.message ?? 'Đã xảy ra lỗi, vui lòng thử lại.')
        }
    }

    const companyFields = [
        { label: 'Tên công ty', value: initialData?.companyName ?? '' },
        { label: 'Email', value: initialData?.email ?? '' },
        { label: 'Mã số thuế', value: initialData?.taxId ?? '' },
        { label: 'Địa chỉ', value: initialData?.address ?? '' },
        { label: 'Số điện thoại', value: initialData?.phoneNumber ?? '' },
        { label: 'Lĩnh vực', value: initialData?.domain ?? '' },
    ]

    const managerFields = [
        { label: 'Tên quản lý', value: initialData?.accountManager ?? '' },
        { label: 'Số điện thoại', value: initialData?.phoneNumber ?? '' },
        { label: 'Email', value: initialData?.email ?? '' },
    ]

    const uncheckedItems = CHECKLIST_ITEMS.filter((item) => !verification[item.id])
    const allChecked = uncheckedItems.length === 0

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-8 px-4">
                    <div className="p-3 mb-0">
                        <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            <span className="h-4 w-1.5 rounded bg-primary" />
                            Thông tin công ty
                        </h3>

                        <div className="space-y-4">
                            {companyFields.map(({ label, value }) => (
                                <div key={label} className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="w-40 block text-end text-base font-medium">{label}</span>
                                        <Input value={value} disabled className="flex-1 bg-muted/40" />
                                    </div>
                                </div>
                            ))}

                            <div key="attachment" className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <span className="w-40 block text-end text-base font-medium">File</span>
                                    <a
                                        href="http://localhost:5173/logo.png"
                                        download="Sample file.png"
                                        className="flex-1 px-3 py-2 rounded-md border bg-muted/40 text-sm text-blue-600 border-input underline"
                                    >
                                        Sample file.png
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3">
                        <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            <span className="h-4 w-1.5 rounded bg-primary" />
                            Thông tin quản lý
                        </h3>

                        <div className="space-y-4">
                            {managerFields.map(({ label, value }) => (
                                <div key={label} className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="w-40 block text-end text-base font-medium">{label}</span>
                                        <Input value={value} disabled className="flex-1 bg-muted/40" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="px-12">
                    <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold">Checklist xác thực Công Ty</h3>
                        <div className="space-y-4">
                            {CHECKLIST_ITEMS.map((item) => (
                                <div key={item.id} className="flex items-start gap-3">
                                    <Checkbox
                                        checked={verification[item.id]}
                                        onCheckedChange={(next) =>
                                            handleToggle(item.id, Boolean(next))
                                        }
                                    />
                                    <div className="space-y-2">
                                        <span className="text-base font-medium">{item.label}</span>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            {item.hints.map((hint) => (
                                                <li key={hint}>{hint}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <Button
                                type="button"
                                variant="secondary"
                                disabled={allChecked}
                                onClick={() => setRequestDialogOpen(true)}
                            >
                                Yêu cầu cập nhật thông tin
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-3 md:col-span-2 flex gap-3">
                <Button type="button" disabled={!allChecked}>
                    Phê duyệt
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: '/admin/companies' })}
                >
                    Hủy
                </Button>
            </div>

            <ConfirmDialog
                open={requestDialogOpen}
                onOpenChange={setRequestDialogOpen}
                title="Yêu cầu cập nhật thông tin"
                desc={
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                            Các hạng mục chưa hoàn thành:
                        </p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {uncheckedItems.map((item) => (
                                <li key={item.id}>{item.label}</li>
                            ))}
                        </ul>
                    </div>
                }
                cancelBtnText="Hủy"
                confirmText="Gửi yêu cầu"
                handleConfirm={handleSendRequest}
                disabled={uncheckedItems.length === 0}
            >
                <div>
                    <label className="text-sm font-medium" htmlFor="request-note">
                        Ghi chú thêm
                    </label>
                    <Textarea
                        id="request-note"
                        className="mt-2"
                        placeholder="Nhập ghi chú cho doanh nghiệp"
                        value={requestNote}
                        onChange={(event) => setRequestNote(event.target.value)}
                        rows={4}
                    />
                </div>
                <p className="text-xs text-muted-foreground italic">
                    Khi bạn nhấn <span className="font-medium">"Gửi yêu cầu"</span>, hệ thống sẽ
                    gửi email thông báo đến quản lý công ty để yêu cầu cập nhật thông tin.
                </p>
            </ConfirmDialog>
        </>
    )
}
