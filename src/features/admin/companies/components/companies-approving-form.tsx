import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ConfirmDialog } from '@/components/confirm-dialog'
import type { Company } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'
import { usePatchPendingCompany } from '@/hooks/api/companies'
import { Loader2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

type ChecklistItem = {
    id: string
    content: string
    required: boolean
    displayOrder: number
    checked: boolean
}


type ChecklistGroup = {
    id: string
    title: string
    items: ChecklistItem[]
}

type ChecklistTemplate = {
    id: string
    name: string
    description: string
    entityType: string
    createdAt: string
    groups: ChecklistGroup[]
}

type CompanyWithVerification = Company & {
    verification?: Record<string, boolean>;
    getCompanyDocumentResponses?: {
        id: string;
        fileUrl: string;
        type: string;
    }[];
};

export default function CompanyApprovingForm({
    initialData,
    checkList,
}: {
    initialData?: CompanyWithVerification
    checkList: ChecklistTemplate
}) {
    const patchPendingCompany = usePatchPendingCompany();
    const navigate = useNavigate();

    const buildInitialVerification = () => {
        const state: Record<string, boolean> = {}
        checkList?.groups?.forEach((group) => {
            group.items.forEach((item) => {
                state[item.id] =
                    typeof item.checked === 'boolean'
                        ? item.checked
                        : Boolean(initialData?.verification?.[item.id])
            })
        })
        return state
    }

    const [verification, setVerification] = useState<Record<string, boolean>>(
        buildInitialVerification()
    )
    const [requestDialogOpen, setRequestDialogOpen] = useState(false)
    const [requestNote, setRequestNote] = useState('');
    const [loadingAction, setLoadingAction] = useState<'ACTIVE' | 'UPDATE_REQUIRED' | null>(null);


    useEffect(() => {
        setVerification(buildInitialVerification())
    }, [checkList])

    useEffect(() => {
        if (!requestDialogOpen) setRequestNote('')
    }, [requestDialogOpen])

    const handleToggle = (id: string, checked: boolean) => {
        setVerification((prev) => ({ ...prev, [id]: checked }))
    }

    const handleSendRequest = async ({ status }
        : {
            status: 'ACTIVE' | 'UPDATE_REQUIRED'
        }
    ) => {
        if (!initialData?.id) {
            setRequestDialogOpen(false)
            return
        }

        const currentUserId = localStorage.getItem('user_id');
        if (!currentUserId) return;

        try {
            setLoadingAction(status);

            const items = checkList.groups.flatMap(group =>
                group.items.map(item => ({
                    templateItemId: item.id,
                    completedById: currentUserId,
                    isChecked: !!verification[item.id],
                }))
            );

            const payload = {
                id: initialData.id,
                status,
                templateId: checkList.id,
                assigneeId: currentUserId,
                notes: status === 'UPDATE_REQUIRED' ? requestNote : '',
                items,
            }

            if (status === 'UPDATE_REQUIRED') {
                await patchPendingCompany.mutateAsync(payload)
                setRequestDialogOpen(false);
                toast.info('📝 Yêu cầu cập nhật đã được gửi thành công!')

            } else {
                await patchPendingCompany.mutateAsync(payload)
                toast.success('✅ Đã phê duyệt yêu cầu thành công!');
                navigate({ to: '/admin/companies/edit?id=' + initialData.id });
            }
        } catch (error: any) {
            console.error('❌ PATCH company failed:', error)
            toast.error(error?.message ? 'Gửi yêu cầu thất bại, ' + error?.message : 'Gửi yêu cầu thất bại, vui lòng thử lại!')
        }
        finally {
            setLoadingAction(null);
        }
    }

    const companyFields = [
        { label: 'Tên công ty', value: initialData?.name ?? '' },
        { label: 'Email', value: initialData?.email ?? '' },
        { label: 'Mã số thuế', value: initialData?.taxCode ?? '' },
        { label: 'Địa chỉ', value: initialData?.address ?? '' },
        { label: 'Số điện thoại', value: initialData?.phone ?? '' },
        {
            label: 'Ngày thành lập',
            value: initialData?.createdAt
                ? new Date(initialData.createdAt).toLocaleDateString('vi-VN')
                : '',
        },
    ]

    const managerFields = [
        { label: 'Tên người liên hệ', value: initialData?.contactPersonName ?? '' },
        { label: 'Số điện thoại', value: initialData?.contactPersonPhone ?? '' },
        { label: 'Email', value: initialData?.contactPersonEmail ?? '' },
    ]

    // ✅ Tính danh sách checklist chưa check
    const requiredItems = checkList?.groups?.flatMap((g) => g.items.filter((i) => i.required)) || []
    const uncheckedItems = requiredItems.filter((item) => !verification[item.id])
    const allChecked = uncheckedItems.length === 0

    const isUpdateLocked = initialData?.status === 'UPDATE_REQUIRED';

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* --- CỘT TRÁI --- */}
                <div className="space-y-8 px-4">
                    {/* Thông tin công ty */}
                    <div className="p-3 mb-0">
                        <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            <span className="h-4 w-1.5 rounded bg-primary" />
                            Thông tin công ty
                        </h3>
                        <div className="space-y-4">
                            {companyFields.map(({ label, value }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <span className="w-40 block text-end text-base font-medium">
                                        {label}
                                    </span>
                                    <Input value={value} disabled className="flex-1 bg-muted/40" />
                                </div>
                            ))}
                        </div>


                    </div>

                    {/* Thông tin người liên hệ */}
                    <div className="p-3">
                        <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            <span className="h-4 w-1.5 rounded bg-primary" />
                            Thông tin người liên hệ
                        </h3>
                        <div className="space-y-4">
                            {managerFields.map(({ label, value }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <span className="w-40 block text-end text-base font-medium">
                                        {label}
                                    </span>
                                    <Input value={value} disabled className="flex-1 bg-muted/40" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {(initialData?.getCompanyDocumentResponses?.length ?? 0) > 0 && (
                        <div className="p-3">
                            <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                <span className="h-4 w-1.5 rounded bg-primary" />
                                Tài liệu đính kèm
                            </h3>

                            <div className="space-y-3">
                                {initialData!.getCompanyDocumentResponses!.map((doc) => {
                                    const rawName = decodeURIComponent(doc.fileUrl.split('/').pop() || 'Tài liệu');
                                    const fileName = rawName.includes('_') ? rawName.split('_').pop()! : rawName;

                                    const typeLabelMap: Record<string, string> = {
                                        BUSINESS_LICENSE: 'Giấy phép kinh doanh',
                                        IDENTIFICATION: 'Giấy tờ cá nhân',
                                        CONTRACT: 'Hợp đồng',
                                    }
                                    const typeLabel = typeLabelMap[doc.type] || doc.type

                                    return (
                                        <div key={doc.id} className="flex items-center gap-3">
                                            <span className="w-40 block text-end text-base font-medium">
                                                {typeLabel}
                                            </span>
                                            <a
                                                href={doc.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download={fileName}
                                                className="flex-1 px-3 py-2 rounded-xs border bg-muted/40 text-sm text-blue-600 border-input underline truncate"
                                                title={fileName}
                                            >
                                                {fileName}
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* --- CỘT PHẢI: CHECKLIST --- */}
                <div className="px-4">
                    <div className="rounded-lg border bg-card p-6 shadow-sm space-y-3">
                        <div>
                            <h3 className="text-lg font-semibold">{checkList?.description}</h3>
                        </div>

                        {/* ✅ Checklist hiển thị theo group */}
                        <div className="space-y-3">
                            {checkList?.groups?.map((group) => (
                                <div key={group.id}>
                                    <h4 className="font-medium text-base mb-2">{group.title}</h4>
                                    <ul className="space-y-3">
                                        {group.items
                                            .sort((a, b) => a.displayOrder - b.displayOrder)
                                            .map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="flex items-start gap-3 border-b pb-2 border-muted/30"
                                                >
                                                    <Checkbox
                                                        className='mt-1 border-white'
                                                        checked={verification[item.id]}
                                                        disabled={isUpdateLocked}
                                                        onCheckedChange={(checked) =>
                                                            handleToggle(item.id, Boolean(checked))
                                                        }
                                                    />
                                                    <span
                                                        className={'text-muted-foreground'}
                                                    >
                                                        {item.content}
                                                        {item.required && (
                                                            <span className="text-red-500 ml-1">*</span>
                                                        )}
                                                    </span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div>
                            <Button
                                type="button"
                                variant="secondary"
                                disabled={allChecked || isUpdateLocked}
                                onClick={() => setRequestDialogOpen(true)}
                            >
                                Yêu cầu cập nhật thông tin
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- HÀNH ĐỘNG CUỐI --- */}
            <div className="pt-3 md:col-span-2 flex gap-3">
                <Button
                    type="button"
                    disabled={!allChecked || isUpdateLocked}
                    onClick={() => handleSendRequest({ status: 'ACTIVE' })}
                >
                    {loadingAction === 'ACTIVE' ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang phê duyệt...
                        </>
                    ) : (
                        'Phê duyệt'
                    )}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: '/admin/companies' })}
                >
                    Hủy
                </Button>
            </div>

            {isUpdateLocked && (
                <p className="text-sm text-muted-foreground italic mt-2 text-center">
                    Công ty đang trong quá trình cập nhật thông tin — bạn không thể chỉnh sửa hoặc phê duyệt lúc này.
                </p>
            )}

            {/* --- DIALOG GỬI YÊU CẦU --- */}
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
                                <li key={item.id}>{item.content}</li>
                            ))}
                        </ul>
                    </div>
                }
                cancelBtnText="Hủy"
                confirmText={
                    loadingAction === 'UPDATE_REQUIRED' ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang gửi...
                        </>
                    ) : (
                        'Gửi yêu cầu'
                    )
                }
                handleConfirm={() =>
                    handleSendRequest({
                        status: 'UPDATE_REQUIRED'
                    })
                }
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
                        onChange={(e) => setRequestNote(e.target.value)}
                        rows={4}
                    />
                </div>
                <p className="text-xs text-muted-foreground italic">
                    Khi bạn nhấn <span className="font-medium">"Gửi yêu cầu"</span>, hệ
                    thống sẽ gửi email thông báo đến người liên hệ của công ty.
                </p>
            </ConfirmDialog>
        </>
    )
}
