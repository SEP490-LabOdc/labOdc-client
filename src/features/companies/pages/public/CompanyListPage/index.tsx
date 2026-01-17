import { useState, useMemo } from "react"
import { Briefcase, Filter, Search, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FiltersBar, type Filters } from "./components/filters-bar"
import { PaginationBar } from "./components/pagination-bar"
import { CardCompany } from "./components/card-company"
import { useGetPublicCompanies } from "@/hooks/api/companies/queries"
import type { Company } from "@/hooks/api/companies/types"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'

export default function CompanyListPage() {
    const [filters, setFilters] = useState<Filters>({
        search: "",
        industry: "all",
        location: "all",
        sort: "relevant",
    })
    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 8
    const { data: companiesData, isLoading, isError } = useGetPublicCompanies()

    // Filter and sort companies on client-side
    const filteredAndSortedCompanies = useMemo(() => {
        if (!companiesData || !Array.isArray(companiesData)) return []

        let filtered = [...companiesData]

        // Filter by search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            filtered = filtered.filter(company =>
                company.name?.toLowerCase().includes(searchLower) ||
                company.description?.toLowerCase().includes(searchLower)
            )
        }

        // Filter by industry
        if (filters.industry !== "all") {
            // Note: Assuming industry field exists in Company type
            // If not, you may need to adjust this filter
            filtered = filtered.filter(company =>
                (company as any).industry === filters.industry
            )
        }

        // Filter by location
        if (filters.location !== "all") {
            filtered = filtered.filter(company =>
                company.address?.includes(filters.location)
            )
        }

        // Sort companies
        switch (filters.sort) {
            case "rating":
                // Sort by rating (if available)
                filtered.sort((a, b) => {
                    const ratingA = (a as any).rating || 0
                    const ratingB = (b as any).rating || 0
                    return ratingB - ratingA
                })
                break
            case "projects":
                // Sort by number of projects (if available)
                filtered.sort((a, b) => {
                    const projectsA = (a as any).openProjects || 0
                    const projectsB = (b as any).openProjects || 0
                    return projectsB - projectsA
                })
                break
            case "newest":
                // Sort by createdAt (if available)
                filtered.sort((a, b) => {
                    const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0
                    const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0
                    return dateB - dateA
                })
                break
            default:
                // Most relevant - keep original order
                break
        }

        return filtered
    }, [companiesData, filters])

    // Paginate companies
    const paginatedCompanies = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize
        const endIndex = startIndex + pageSize
        return filteredAndSortedCompanies.slice(startIndex, endIndex)
    }, [filteredAndSortedCompanies, currentPage, pageSize])

    const totalItems = filteredAndSortedCompanies.length
    const totalPages = Math.ceil(totalItems / pageSize)

    const handleFiltersChange = (newFilters: Filters) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setFilters({
            search: "",
            industry: "all",
            location: "all",
            sort: "relevant",
        })
        setCurrentPage(1)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-balance">Khám phá công ty</h1>
                    <p className="text-muted-foreground">Tìm kiếm và kết nối với các công ty hàng đầu trong ngành công nghệ</p>
                </div>

                {/* Filters - Desktop */}
                <div className="hidden md:block mb-8">
                    <div className="">
                        <FiltersBar filters={filters} onFiltersChange={handleFiltersChange} />
                    </div>
                </div>

                {/* Filters - Mobile */}
                <div className="md:hidden mb-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full bg-transparent">
                                <Filter className="h-4 w-4 mr-2" />
                                Bộ lọc
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[80vh]">
                            <SheetHeader>
                                <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Tìm kiếm theo tên công ty, ngành..."
                                        value={filters.search}
                                        onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                                        className="pl-10"
                                    />
                                </div>

                                <Select
                                    value={filters.industry}
                                    onValueChange={(value) => handleFiltersChange({ ...filters, industry: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn ngành" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tất cả ngành</SelectItem>
                                        <SelectItem value="IT Services">IT Services</SelectItem>
                                        <SelectItem value="Fintech">Fintech</SelectItem>
                                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                                        <SelectItem value="Game">Game</SelectItem>
                                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={filters.location}
                                    onValueChange={(value) => handleFiltersChange({ ...filters, location: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn địa điểm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tất cả địa điểm</SelectItem>
                                        <SelectItem value="Ho Chi Minh">Ho Chi Minh</SelectItem>
                                        <SelectItem value="Ha Noi">Ha Noi</SelectItem>
                                        <SelectItem value="Da Nang">Da Nang</SelectItem>
                                        <SelectItem value="Singapore">Singapore</SelectItem>
                                        <SelectItem value="Bangkok">Bangkok</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={filters.sort}
                                    onValueChange={(value) => handleFiltersChange({ ...filters, sort: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sắp xếp theo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevant">Phù hợp nhất</SelectItem>
                                        <SelectItem value="projects">Nhiều dự án nhất</SelectItem>
                                        <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                                        <SelectItem value="newest">Mới nhất</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-muted-foreground">
                        {isLoading ? (
                            "Đang tìm kiếm..."
                        ) : (
                            `Tìm thấy ${totalItems} công ty`
                        )}
                    </p>
                    {(filters.search || filters.industry !== "all" || filters.location !== "all") && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} disabled={isLoading}>
                            Xóa bộ lọc
                        </Button>
                    )}
                </div>

                {/* Loading state */}
                {isLoading && (
                    <div className="text-center py-16">
                        <Loader2 className="h-12 w-12 mx-auto animate-spin text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Đang tải danh sách công ty...</p>
                    </div>
                )}

                {/* Error state */}
                {isError && !isLoading && (
                    <div className="text-center py-16">
                        <div className="mb-4">
                            <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Lỗi khi tải dữ liệu</h3>
                        <p className="text-muted-foreground mb-4">Vui lòng thử lại sau</p>
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && !isError && paginatedCompanies.length === 0 && (
                    <div className="text-center py-16">
                        <div className="mb-4">
                            <Briefcase className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Không tìm thấy công ty phù hợp</h3>
                        <p className="text-muted-foreground mb-4">Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                        <Button onClick={clearFilters}>Xóa bộ lọc</Button>
                    </div>
                )}

                {/* Company grid */}
                {!isLoading && !isError && paginatedCompanies.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {paginatedCompanies.map((company) => (
                                <CardCompany key={company.id} company={company as Company} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <PaginationBar currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
