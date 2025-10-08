import { useState } from "react"
import { Briefcase, Filter, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FiltersBar, type Filters } from "./components/filters-bar"
import { PaginationBar } from "./components/pagination-bar"
import { CardCompany } from "./components/card-company"
import type { Company } from "@/features/companies/types"
import { fetchCompanies } from "@/features/companies/api/fetchCompanies"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
// import { FiltersMobile } from "./components/filters-mobile"

// function applyFiltersSort(companies: Company[], filters: Filters): Company[] {
//     const filtered = companies.filter((company) => {
//         const matchesSearch =
//             !filters.search ||
//             company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
//             company.industry.toLowerCase().includes(filters.search.toLowerCase())
//
//         const matchesIndustry = !filters.industry || company.industry === filters.industry
//         const matchesLocation = !filters.location || company.location.includes(filters.location)
//
//         return matchesSearch && matchesIndustry && matchesLocation
//     })
//
//     // Sort
//     switch (filters.sort) {
//         case "rating":
//             filtered.sort((a, b) => b.rating - a.rating)
//             break
//         case "projects":
//             filtered.sort((a, b) => b.openProjects - a.openProjects)
//             break
//         case "newest":
//             // Mock newest sort by id
//             filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
//             break
//         default:
//             // Most relevant - keep original order
//             break
//     }
//
//     return filtered
// }

export default function CompanyListPage() {
    const [companies, setCompanies] = useState<Company[]>(fetchCompanies)
    const [filters, setFilters] = useState<Filters>({
        search: "",
        industry: "all",
        location: "all",
        sort: "relevant",
    })
    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 8

    // const filteredCompanies = useMemo(() => {
    //     return applyFiltersSort(companies, filters)
    // }, [companies, filters])

    const totalPages = Math.ceil(companies.length / pageSize)
    const paginatedCompanies = companies.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    const handleToggleFollow = (id: string) => {
        setCompanies((prev) =>
            prev.map((company) => (company.id === id ? { ...company, isFollowed: !company.isFollowed } : company)),
        )
    }

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
                    <div className="bg-card p-6 rounded-2xl shadow-sm border">
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
                    <p className="text-sm text-muted-foreground">Tìm thấy {companies.length} công ty</p>
                    {(filters.search || filters.industry !== "all" || filters.location !== "all") && (
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                            Xóa bộ lọc
                        </Button>
                    )}
                </div>

                {/* Empty state */}
                {companies.length === 0 && (
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
                {paginatedCompanies.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {paginatedCompanies.map((company) => (
                                <CardCompany key={company.id} company={company} onToggleFollow={handleToggleFollow} />
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
