import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export type Filters = {
    search: string
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
        </div>
    )
}