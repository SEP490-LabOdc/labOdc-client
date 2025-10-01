import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export type Filters = {
    search: string
    industry: string
    location: string
    sort: string
}

export function FiltersBar({
    filters,
    onFiltersChange,
}: {
    filters: Filters
    onFiltersChange: (filters: Filters) => void
}) {
    return (
        <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm theo tên công ty, ngành..."
                        value={filters.search}
                        onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                        className="pl-10"
                    />
                </div>
            </div>

            <Select value={filters.industry} onValueChange={(value) => onFiltersChange({ ...filters, industry: value })}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Ngành" />
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

            <Select value={filters.location} onValueChange={(value) => onFiltersChange({ ...filters, location: value })}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Địa điểm" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Ho Chi Minh">Ho Chi Minh</SelectItem>
                    <SelectItem value="Ha Noi">Ha Noi</SelectItem>
                    <SelectItem value="Da Nang">Da Nang</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="Bangkok">Bangkok</SelectItem>
                </SelectContent>
            </Select>

            <Select value={filters.sort} onValueChange={(value) => onFiltersChange({ ...filters, sort: value })}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="relevant">Phù hợp nhất</SelectItem>
                    <SelectItem value="projects">Nhiều dự án</SelectItem>
                    <SelectItem value="rating">Đánh giá cao</SelectItem>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}