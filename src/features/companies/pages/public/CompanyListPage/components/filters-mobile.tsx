import React from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Filter, Search } from 'lucide-react'

export function FiltersMobile() {
    return (
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
                        value={filters.size}
                        onValueChange={(value) => handleFiltersChange({ ...filters, size: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn quy mô" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả quy mô</SelectItem>
                            <SelectItem value="1-10">1-10 nhân viên</SelectItem>
                            <SelectItem value="11-50">11-50 nhân viên</SelectItem>
                            <SelectItem value="51-200">51-200 nhân viên</SelectItem>
                            <SelectItem value="200+">200+ nhân viên</SelectItem>
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
    )
}
