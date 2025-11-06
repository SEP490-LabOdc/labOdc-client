import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Calendar, DollarSign, FileText, Tag, Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/date-picker'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx'

// Schema validation
const projectFormSchema = z.object({
  title: z.string().min(1, 'Tiêu đề là bắt buộc').min(5, 'Tiêu đề phải có ít nhất 5 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  startDate: z.date(),
  endDate: z.date().optional(),
  budget: z.number().min(0, 'Ngân sách phải lớn hơn 0').optional(),
  status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED']),
  skills: z.array(z.string()),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

export function CompanyProjectCreatePage() {
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: undefined,
      endDate: undefined,
      budget: undefined,
      status: 'PENDING',
      skills: [],
    },
  })

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()]
      setSkills(newSkills)
      form.setValue('skills', newSkills)
      setSkillInput('')
    }
  }

  const removeSkill = (skill: string) => {
    const newSkills = skills.filter(s => s !== skill)
    setSkills(newSkills)
    form.setValue('skills', newSkills)
  }

  const onSubmit = (values: ProjectFormValues) => {
    console.log('Form values:', values)
    alert('Form submitted! Check console for data.')
  }

  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="space-y-8 mb-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/company-admin/projects">Dự án</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Tạo dự án mới</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            {/* Title with icon */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tạo dự án mới</h1>
                <p className="text-muted-foreground mt-1">
                  Tạo dự án để kết nối với các freelancer tài năng
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <Button asChild variant="outline" size="sm">
            <Link to="/company-admin/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Link>
          </Button>
        </div>

        {/* Description */}
        <div>
          <p className="text-base text-muted-foreground leading-relaxed">
            Điền đầy đủ thông tin dự án để thu hút các freelancer phù hợp.
            Mô tả chi tiết về yêu cầu, thời gian và ngân sách sẽ giúp bạn tìm được
            những ứng viên chất lượng nhất.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Thông tin cơ bản</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel className="text-base font-medium">Tiêu đề dự án *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tiêu đề dự án"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription>
                      Tiêu đề ngắn gọn, mô tả rõ ràng về dự án
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel className="text-base font-medium">Mô tả dự án *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập mô tả chi tiết về dự án..."
                        className="min-h-[140px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Mô tả chi tiết về mục tiêu, phạm vi và yêu cầu của dự án
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Time Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Thời gian thực hiện</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Ngày bắt đầu *</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onSelect={field.onChange}
                        placeholder="Chọn ngày bắt đầu"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Ngày kết thúc</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        placeholder="Chọn ngày kết thúc (tùy chọn)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Budget & Skills Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Ngân sách & Kỹ năng</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Ngân sách (VND)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập ngân sách dự án"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        onBlur={field.onBlur}
                        className="h-11"
                      />
                    </FormControl>
                    <FormDescription>
                      Ngân sách dự kiến cho dự án (tùy chọn)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Kỹ năng yêu cầu
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Nhập kỹ năng..."
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                addSkill()
                              }
                            }}
                            className="flex-1 h-11"
                          />
                          <Button
                            type="button"
                            onClick={addSkill}
                            variant="outline"
                            className="h-11 px-4"
                          >
                            Thêm
                          </Button>
                        </div>
                        {skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="px-3 py-2 text-sm flex items-center gap-2"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Nhấn Enter hoặc nút Thêm để thêm kỹ năng
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              asChild
              className="min-w-[100px] h-11"
            >
              <Link to="/company-admin/projects">Hủy</Link>
            </Button>
            <Button type="submit" className="min-w-[140px] h-11">
              <Save className="mr-2 h-4 w-4" />
              Tạo dự án
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
