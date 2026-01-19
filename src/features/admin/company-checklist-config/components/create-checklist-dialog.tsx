import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Plus, X, CheckSquare, FolderPlus } from 'lucide-react'
import { useCreateCompanyChecklist } from '@/hooks/api/company-checklist-config'

const ENTITY_OPTIONS = [
  { value: 'COMPANY_REGISTRATION', label: 'Đăng ký công ty' },
  { value: 'PROJECT_SUBMISSION', label: 'Nộp dự án' },
  { value: 'TALENT_APPLICATION', label: 'Ứng tuyển tài năng' },
] as const

const checklistSchema = z.object({
  name: z.string().min(3, 'Tên check-list phải có ít nhất 3 ký tự').max(100),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự').max(500),
  entityType: z.string().min(1, 'Loại entity là bắt buộc'),
  groups: z
    .array(
      z.object({
        title: z.string().min(1, 'Tên nhóm không được để trống'),
        items: z
          .array(
            z.object({
              content: z.string().min(1, 'Nội dung mục không được để trống'),
              required: z.boolean(), // ✅ KHÔNG default(false)
            })
          )
          .min(1, 'Mỗi nhóm phải có ít nhất 1 mục'),
      })
    )
    .min(1, 'Phải có ít nhất 1 nhóm'),
})

type ChecklistForm = z.infer<typeof checklistSchema>

interface CreateChecklistDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateChecklistDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: CreateChecklistDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createMutation = useCreateCompanyChecklist()

  const form = useForm<ChecklistForm>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      name: '',
      description: '',
      entityType: 'COMPANY_REGISTRATION',
      groups: [
        {
          title: '',
          items: [{ content: '', required: false }],
        },
      ],
    },
    mode: 'onSubmit',
  })

  const { fields: groupFields, append: appendGroup, remove: removeGroup } =
    useFieldArray({
      control: form.control,
      name: 'groups',
    })

  const addGroup = () => {
    appendGroup({
      title: '',
      items: [{ content: '', required: false }],
    })
  }

  const removeGroupAt = (groupIndex: number) => {
    if (groupFields.length > 1) removeGroup(groupIndex)
  }

  const addItemToGroup = (groupIndex: number) => {
    const currentItems = form.getValues(`groups.${groupIndex}.items`)
    form.setValue(`groups.${groupIndex}.items`, [
      ...currentItems,
      { content: '', required: false },
    ])
  }

  const removeItemFromGroup = (groupIndex: number, itemIndex: number) => {
    const currentItems = form.getValues(`groups.${groupIndex}.items`)
    if (currentItems.length <= 1) return
    form.setValue(
      `groups.${groupIndex}.items`,
      currentItems.filter((_, idx) => idx !== itemIndex)
    )
  }

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  const onSubmit = async (values: ChecklistForm) => {
    setIsSubmitting(true)
    try {
      const payload = {
        name: values.name,
        description: values.description,
        entityType: values.entityType,
        groups: values.groups.map((g, gi) => ({
          title: g.title,
          displayOrder: gi,
          items: g.items.map((it, ii) => ({
            content: it.content,
            displayOrder: ii,
            required: it.required,
          })),
        })),
      }

      await createMutation.mutateAsync(payload)
      toast.success('Tạo check-list thành công!')
      form.reset()
      onSuccess()
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Tạo check-list thất bại!')
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose()
        else onOpenChange(true)
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Tạo Check-list mới
          </DialogTitle>
          <DialogDescription>
            Tạo check-list mới với các nhóm và mục kiểm tra. Các trường có dấu *
            là bắt buộc.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Check-list *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="VD: Check-list đăng ký công ty"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả mục đích/cách dùng check-list..."
                      rows={3}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại Entity *</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn entityType" />
                      </SelectTrigger>
                      <SelectContent>
                        {ENTITY_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base font-medium">
                  Nhóm kiểm tra *
                </FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addGroup}
                  disabled={isSubmitting}
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Thêm nhóm
                </Button>
              </div>

              <div className="space-y-4">
                {groupFields.map((groupField, groupIndex) => (
                  <div
                    key={groupField.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Nhóm {groupIndex + 1}</Badge>
                      {groupFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeGroupAt(groupIndex)}
                          disabled={isSubmitting}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name={`groups.${groupIndex}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên nhóm *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="VD: Thông tin cơ bản"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium">
                          Mục kiểm tra *
                        </FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addItemToGroup(groupIndex)}
                          disabled={isSubmitting}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Thêm mục
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {(form.watch(`groups.${groupIndex}.items`) ?? []).map(
                          (_, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-start gap-2 p-3 border rounded"
                            >
                              <Badge
                                variant="outline"
                                className="min-w-[24px] justify-center mt-1"
                              >
                                {itemIndex + 1}
                              </Badge>

                              <div className="flex-1 space-y-2">
                                <FormField
                                  control={form.control}
                                  name={`groups.${groupIndex}.items.${itemIndex}.content`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          placeholder="Nội dung mục kiểm tra"
                                          {...field}
                                          disabled={isSubmitting}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`groups.${groupIndex}.items.${itemIndex}.required`}
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={(v) =>
                                            field.onChange(!!v)
                                          }
                                          disabled={isSubmitting}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm">
                                        Bắt buộc
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              </div>

                              {(form.watch(`groups.${groupIndex}.items`)
                                ?.length ?? 0) > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeItemFromGroup(groupIndex, itemIndex)
                                  }
                                  disabled={isSubmitting}
                                  className="text-red-600 hover:text-red-700 mt-1"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {form.formState.errors.groups && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.groups.message as any}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang tạo...' : 'Tạo Check-list'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
