import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import type { FeeDistributionConfig, FeeDistributionProperties } from '@/hooks/api/system-config/types'
import { useUpdateSystemConfig } from '@/hooks/api/system-config'

interface FeeDistributionConfigEditorProps {
    config: FeeDistributionConfig
}

export function FeeDistributionConfigEditor({ config }: FeeDistributionConfigEditorProps) {
    const updateMutation = useUpdateSystemConfig<FeeDistributionProperties>()

    const [formData, setFormData] = useState<FeeDistributionProperties>({
        systemFeeRate: config.properties.systemFeeRate,
        mentorShareRate: config.properties.mentorShareRate,
        talentShareRate: config.properties.talentShareRate,
    })

    // Update form data when config changes
    useEffect(() => {
        setFormData({
            systemFeeRate: config.properties.systemFeeRate,
            mentorShareRate: config.properties.mentorShareRate,
            talentShareRate: config.properties.talentShareRate,
        })
    }, [config])

    const handleChange = (field: keyof FeeDistributionProperties, value: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate: tổng các rate phải bằng 1
        const total = formData.systemFeeRate + formData.mentorShareRate + formData.talentShareRate
        if (Math.abs(total - 1) > 0.001) {
            toast.error('Tổng tỷ lệ phải bằng 1 (100%)')
            return
        }

        try {
            await updateMutation.mutateAsync({
                id: config.id,
                properties: formData,
            })
            toast.success('Cập nhật cấu hình phân chia phí thành công!')
        } catch (error: any) {
            toast.error(error?.message || 'Cập nhật cấu hình thất bại')
        }
    }

    const totalRate = formData.systemFeeRate + formData.mentorShareRate + formData.talentShareRate
    const isValid = Math.abs(totalRate - 1) < 0.001

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* System Fee Rate */}
            <div className="space-y-2">
                <Label htmlFor="systemFeeRate">
                    Tỷ lệ phí hệ thống (System Fee Rate)
                </Label>
                <Input
                    id="systemFeeRate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.systemFeeRate}
                    onChange={(e) =>
                        handleChange('systemFeeRate', parseFloat(e.target.value) || 0)
                    }
                    disabled={updateMutation.isPending}
                />
                <p className="text-sm text-muted-foreground">
                    {((formData.systemFeeRate * 100).toFixed(1))}% của tổng số tiền
                </p>
            </div>

            {/* Mentor Share Rate */}
            <div className="space-y-2">
                <Label htmlFor="mentorShareRate">
                    Tỷ lệ chia cho Mentor (Mentor Share Rate)
                </Label>
                <Input
                    id="mentorShareRate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.mentorShareRate}
                    onChange={(e) =>
                        handleChange('mentorShareRate', parseFloat(e.target.value) || 0)
                    }
                    disabled={updateMutation.isPending}
                />
                <p className="text-sm text-muted-foreground">
                    {((formData.mentorShareRate * 100).toFixed(1))}% của tổng số tiền
                </p>
            </div>

            {/* Talent Share Rate */}
            <div className="space-y-2">
                <Label htmlFor="talentShareRate">
                    Tỷ lệ chia cho Talent (Talent Share Rate)
                </Label>
                <Input
                    id="talentShareRate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.talentShareRate}
                    onChange={(e) =>
                        handleChange('talentShareRate', parseFloat(e.target.value) || 0)
                    }
                    disabled={updateMutation.isPending}
                />
                <p className="text-sm text-muted-foreground">
                    {((formData.talentShareRate * 100).toFixed(1))}% của tổng số tiền
                </p>
            </div>

            <Separator />

            {/* Total Rate Validation */}
            <div className="p-4 rounded-md border">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Tổng tỷ lệ:</span>
                    <span
                        className={`font-bold ${isValid ? 'text-green-600' : 'text-red-600'
                            }`}
                    >
                        {(totalRate * 100).toFixed(2)}%
                    </span>
                </div>
                {isValid ? (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Tỷ lệ hợp lệ (tổng = 100%)</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                            Tỷ lệ không hợp lệ. Tổng phải bằng 100% (hiện tại:{(totalRate * 100).toFixed(2)}%)
                        </span>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2">
                <Button
                    type="submit"
                    disabled={!isValid || updateMutation.isPending}
                    className="bg-[#2a9d8f] hover:bg-[#1e7a6e]"
                >
                    {updateMutation.isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Đang lưu...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Lưu thay đổi
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}

