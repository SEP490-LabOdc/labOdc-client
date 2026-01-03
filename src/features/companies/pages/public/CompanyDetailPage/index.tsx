import { useParams } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Briefcase, Calendar, Globe, Mail, MapPin, Star, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetCompanyById } from '@/hooks/api/companies/queries'
import { useGetProjectsByCompanyId } from '@/hooks/api/projects/queries'
import { GeneralError } from '@/features/errors/general-error'
import { Skeleton } from '@/components/ui/skeleton'

export default function CompanyDetailPage() {
    const { companyId } = useParams({ from: '/(public)/companies/$companyId' });

    const {
        data: companyData,
        isLoading: isCompanyLoading,
        isError: isCompanyError
    } = useGetCompanyById(companyId)

    const {
        data: projectsData,
        isLoading: isProjectsLoading
    } = useGetProjectsByCompanyId(companyId || '')

    const company = companyData?.data
    const projects = projectsData?.data?.projectResponses || []

    if (isCompanyError) return <GeneralError />

    if (isCompanyLoading) {
        return (
            <div className="container mx-auto max-w-6xl px-4 py-6">
                <Skeleton className="w-full h-64 rounded-md" />
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <Skeleton className="h-64 w-full rounded-md" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-48 w-full rounded-md" />
                    </div>
                </div>
            </div>
        )
    }

    if (!company) return <GeneralError />

    return (
        <div className="container mx-auto max-w-7xl px-4 py-4">
            {/* HERO */}
            <Card className="relative w-full overflow-hidden p-0">
                {/* Cover Image */}
                <div className="relative h-64 w-full overflow-hidden bg-linear-to-r from-primary to-secondary">
                    <img
                        src={company.banner || "/placeholder-banner.jpg"}
                        alt={`${company.name} cover`}
                        className="h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                </div>

                {/* Company Logo */}
                <div className="absolute top-50 left-6 z-10">
                    <div className="h-28 w-28 rounded-md overflow-hidden border-4 border-card bg-card ring-2 ring-primary/20 flex items-center justify-center">
                        <img
                            src={company.logo || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            className="h-full w-full object-contain p-2"
                        />
                    </div>
                </div>

                {/* Header Info */}
                <div className="bg-card pb-6 px-6">
                    <div className="flex items-start gap-6">
                        {/* Logo Space - Invisible spacer to push content right */}
                        <div className="w-28 shrink-0" />

                        {/* Header Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">{company.name}</h1>
                                        {company.industry && (
                                            <Badge variant="secondary" className="shrink-0">{company.industry}</Badge>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                                        {company.address && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <MapPin className="h-4 w-4" /> {company.address}
                                            </span>
                                        )}
                                        {(company.rating || company.reviews) && (
                                            <>
                                                <Separator orientation="vertical" className="h-4" />
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Star className="h-4 w-4 fill-accent text-accent" />
                                                    {company.rating || 0} <span className="text-muted-foreground">({company.reviews || 0} reviews)</span>
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-md bg-primary/10">
                                                <Briefcase className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground">Projects mở</div>
                                                <div className="text-lg font-semibold text-foreground">{projects.length}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-md bg-secondary/10">
                                                <Users className="h-5 w-5 text-secondary" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground">Đã hợp tác</div>
                                                <div className="text-lg font-semibold text-foreground">{company.collaboratedTalents || 0} talents</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {company.website && (
                                    <div className="shrink-0">
                                        <Button asChild variant="outline" size="lg">
                                            <a href={company.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                                                <Globe className="h-4 w-4" /> Website
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            {/* MAIN GRID */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* left/main */}
                <div className="lg:col-span-2">
                    {/* Tabs */}
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 h-auto">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="talents">Talents</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-4">
                            <Card>
                                <CardContent className="p-5 leading-relaxed text-sm text-muted-foreground">
                                    {company.description || company.bio || 'Chưa có mô tả.'}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="projects" className="mt-4">
                            <div className="grid gap-3">
                                {isProjectsLoading ? (
                                    <Card><CardContent className="p-5 text-sm text-muted-foreground">Đang tải dự án...</CardContent></Card>
                                ) : projects.length === 0 ? (
                                    <Card><CardContent className="p-5 text-sm text-muted-foreground">Chưa có dự án công khai.</CardContent></Card>
                                ) : (
                                    projects.map((project: any) => (
                                        <Card key={project.id || project.projectId}>
                                            <CardContent className="p-5">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-medium">{project.title || project.projectName || project.name}</h3>
                                                    {project.status && (
                                                        <Badge variant="outline">{project.status}</Badge>
                                                    )}
                                                </div>
                                                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                                    {project.description || project.summary || 'Chưa có mô tả.'}
                                                </p>
                                                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                                                    {project.budget && (
                                                        <span className="font-medium text-foreground">
                                                            Ngân sách: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(project.budget)}
                                                        </span>
                                                    )}
                                                    {project.startDate && (
                                                        <span>
                                                            Bắt đầu: {new Date(project.startDate).toLocaleDateString('vi-VN')}
                                                        </span>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="talents" className="mt-4">
                            <Card>
                                <CardContent className="p-5 text-sm text-muted-foreground">
                                    Danh sách talents đã/đang hợp tác (tùy quyền hiển thị).
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* right/sidebar */}
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-5 space-y-3">
                            <div className="font-medium">Thông tin liên hệ</div>
                            <div className="text-sm text-muted-foreground space-y-2">
                                {company.email && (
                                    <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {company.email}</div>
                                )}
                                {company.website && (
                                    <a className="flex items-center gap-2 hover:underline" href={company.website} target="_blank" rel="noreferrer">
                                        <Globe className="h-4 w-4" /> {company.website.replace(/^https?:\/\//, "")}
                                    </a>
                                )}
                                {company.foundedYear && (
                                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Thành lập: {company.foundedYear}</div>
                                )}
                                {(company.address || company.location) && (
                                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {company.address || company.location}</div>
                                )}
                            </div>
                            <Separator />
                            <Button className="w-full">Liên hệ công ty</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-0">
                            {/* Map placeholder / ảnh trụ sở */}
                            <div className="h-48 w-full rounded-md overflow-hidden bg-muted">
                                <img src="/placeholder-map.png" alt="Map" className="w-full h-full object-cover" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
