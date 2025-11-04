// src/features/company-admin/projects/create/index.tsx
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Calendar, DollarSign, FileText, Tag } from 'lucide-react'
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { useState } from 'react'

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
        // TODO: Gọi API tạo dự án khi có backend
        // Hiện tại chỉ log để xem data
        alert('Form submitted! Check console for data.')
    }

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6">
                <Button asChild variant="ghost" size="sm" className="mb-4">
                    <Link to="/company/projects">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại danh sách
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Tạo dự án mới</h1>
                <p className="text-muted-foreground mt-2">
                    Điền thông tin để tạo dự án mới
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Thông tin cơ bản
                            </CardTitle>
                            <CardDescription>
                                Nhập thông tin cơ bản về dự án
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tiêu đề dự án *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập tiêu đề dự án"
                                                {...field}
                                                className="max-w-2xl"
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
                                    <FormItem>
                                        <FormLabel>Mô tả dự án *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Nhập mô tả chi tiết về dự án..."
                                                className="max-w-2xl min-h-[120px]"
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

                            <div className="space-y-2">
                                <FormLabel>Trạng thái</FormLabel>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-sm">
                                        Đang chờ duyệt
                                    </Badge>
                                    <p className="text-sm text-muted-foreground">
                                        Dự án mới tạo sẽ ở trạng thái chờ duyệt
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Thời gian
                            </CardTitle>
                            <CardDescription>
                                Thiết lập thời gian bắt đầu và kết thúc dự án
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ngày bắt đầu *</FormLabel>
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
                                            <FormLabel>Ngày kết thúc</FormLabel>
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
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5" />
                                Ngân sách & Kỹ năng
                            </CardTitle>
                            <CardDescription>
                                Thiết lập ngân sách và các kỹ năng yêu cầu
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ngân sách (VND)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Nhập ngân sách dự án"
                                                value={field.value ?? ''}
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                                onBlur={field.onBlur}
                                                className="max-w-md"
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
                                        <FormLabel className="flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            Kỹ năng yêu cầu
                                        </FormLabel>
                                        <FormControl>
                                            <div className="space-y-3 max-w-2xl">
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Nhập kỹ năng và nhấn Enter"
                                                        value={skillInput}
                                                        onChange={(e) => setSkillInput(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault()
                                                                addSkill()
                                                            }
                                                        }}
                                                        className="flex-1"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={addSkill}
                                                        variant="outline"
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
                                                                className="px-3 py-1 text-sm"
                                                            >
                                                                {skill}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeSkill(skill)}
                                                                    className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
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
                                            Thêm các kỹ năng cần thiết cho dự án. Nhấn Enter hoặc nút Thêm để thêm.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            asChild
                        >
                            <Link to="/company/projects">Hủy</Link>
                        </Button>
                        <Button type="submit" className="min-w-[120px]">
                            <Save className="mr-2 h-4 w-4" />
                            Tạo dự án
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
