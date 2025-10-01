import React, { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Briefcase, Calendar, Globe, Heart, Mail, MapPin, Star, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Company } from '@/features/companies/types'
import { findCompanyById } from '@/features/companies/api/getCompanyById'

type Props = {
    company: Company
    projects?: Array<{ id: string; name: string; summary: string }>
    onToggleFollow?: (id: string) => void
}

export default function CompanyDetailPage() {
    const [followed, setFollowed] = useState(false)
    const { companyId } = useParams({ from: '/(public)/companies/$companyId' });

    const company: Company = findCompanyById(companyId)

    const toggleFollow = () => {
        setFollowed(true)
    }

    if(company)

    return (
        <div className="mx-auto max-w-6xl">
            {/* HERO */}
            <div className="relative w-full h-120 overflow-hidden rounded-xl">
                <img
                    src={company.coverUrl || "/placeholder-banner.jpg"}
                    alt={`${company.name} cover`}
                    className="w-full h-8/12 object-cover"
                />
                {/* HEADER INFO */}
                <div className="relative bg-[#264653] h-full py-8">
                    <div className="flex justify-around items-center gap-3">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl text-white sm:text-2xl font-semibold truncate">{company.name}</h1>
                                <Badge variant="secondary" className="shrink-0">{company.industry}</Badge>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white">
                                <span className="inline-flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> {company.location}
                                </span>
                                <Separator orientation="vertical" className="hidden sm:inline-block h-4" />
                                <span className="inline-flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {company.rating} <span className="ml-1">({company.reviews} reviews)</span>
                                </span>
                            </div>
                            <div className="p-4 flex items-center gap-3">
                                <Briefcase className="h-5 w-5 text-primary" />
                                <div>
                                    <div className="text-sm text-muted-foreground">Projects mở</div>
                                    <div className="text-lg font-semibold">{company.openProjects}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {company.website && (
                                <Button asChild variant="outline">
                                    <a href={company.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                                        <Globe className="h-4 w-4" /> Website
                                    </a>
                                </Button>
                            )}
                            <Button
                                variant={followed ? "secondary" : "default"}
                                onClick={toggleFollow}
                                className={followed ? "text-red-600 bg-red-50 hover:bg-red-100" : ""}
                            >
                                <Heart className={`h-4 w-4 mr-1 ${followed ? "fill-red-600" : ""}`} />
                                {followed ? "Đã theo dõi" : "Theo dõi"}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-16 left-6">
                    <div className="h-34 w-34 rounded-md overflow-hidden border bg-white shadow-md flex items-center justify-center">
                        <img
                            src={company.logoUrl || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            className="h-20 w-20 object-contain"
                        />
                    </div>
                </div>
            </div>



            {/* MAIN GRID */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* left/main */}
                <div className="lg:col-span-2">
                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        <Card>

                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-3">
                                <Users className="h-5 w-5 text-primary" />
                                <div>
                                    <div className="text-sm text-muted-foreground">Đã hợp tác</div>
                                    <div className="text-lg font-semibold">{company.collaboratedTalents} talents</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="talents">Talents</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-4">
                            <Card>
                                <CardContent className="p-5 leading-relaxed text-sm text-muted-foreground">
                                    {company.bio}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="projects" className="mt-4">
                            <div className="grid gap-3">
                                {/* {projects.length === 0 ? (
                                    <Card><CardContent className="p-5 text-sm text-muted-foreground">Chưa có dự án công khai.</CardContent></Card>
                                ) : (
                                    projects.map((p) => (
                                        <Card key={p.id}>
                                            <CardContent className="p-5">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-medium">{p.name}</h3>
                                                    <Button size="sm" variant="outline">Xem chi tiết</Button>
                                                </div>
                                                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.summary}</p>
                                            </CardContent>
                                        </Card>
                                    ))
                                )} */}
                                <Card><CardContent className="p-5 text-sm text-muted-foreground">Chưa có dự án công khai.</CardContent></Card>
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
                                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {company.location}</div>
                            </div>
                            <Separator />
                            <Button className="w-full">Liên hệ công ty</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-0">
                            {/* Map placeholder / ảnh trụ sở */}
                            <div className="h-48 w-full rounded-lg overflow-hidden">
                                <img src="/placeholder-map.png" alt="Map" className="w-full h-full object-cover" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
