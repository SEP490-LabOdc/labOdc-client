import React, { useState } from 'react'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MoreHorizontal,
  FileText,
  Plus,
  Search,
  ChevronLeft,
  ListFilter,
} from 'lucide-react'

// 1. ĐỊNH NGHĨA KIỂU DỮ LIỆU (TYPE) TỪ API
// (Sử dụng 'Pending' | 'Interviewing' ... để có thể gán màu)
type CandidateStatus = 'Pending' | 'Interviewing' | 'Hired' | 'Rejected'

interface Candidate {
  id: string;
  userId: string;
  name: string;
  cvUrl: string;
  status: CandidateStatus;
  appliedAt: string; // Giữ string để parse
}

// 2. DỮ LIỆU GIẢ (MOCK DATA) DỰA TRÊN API RESPONSE
const mockCandidates: Candidate[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
    userId: 'user-001',
    name: 'Hoàng Văn An',
    cvUrl: 'https.example.com/cv/hoangvanan.pdf',
    status: 'Pending',
    appliedAt: '2025-11-12T10:05:14.406Z',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
    userId: 'user-002',
    name: 'Trần Thị Bích',
    cvUrl: 'https.example.com/cv/tranbich.pdf',
    status: 'Interviewing',
    appliedAt: '2025-11-11T14:30:00.000Z',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
    userId: 'user-003',
    name: 'Nguyễn Văn Hùng',
    cvUrl: 'https.example.com/cv/nguyenhung.pdf',
    status: 'Hired',
    appliedAt: '2025-11-10T09:00:00.000Z',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa4',
    userId: 'user-004',
    name: 'Lê Thu Cúc',
    cvUrl: 'https.example.com/cv/lethucuc.pdf',
    status: 'Rejected',
    appliedAt: '2025-11-09T17:15:00.000Z',
  },
]

// 3. HÀM HỖ TRỢ (HELPER) ĐỂ ĐỔI MÀU TRẠNG THÁI
const getStatusColor = (status: CandidateStatus) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Interviewing':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Hired':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Rejected':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

// === COMPONENT TRANG DANH SÁCH ỨNG VIÊN ===
export const CandidateListPage: React.FC = () => {
  // (State cho filter và search)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Lọc dữ liệu (logic đơn giản)
  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesStatus =
      statusFilter === 'all' || candidate.status === statusFilter
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Hàm helper định dạng ngày
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* === 1. THANH TIÊU ĐỀ (HEADER) === */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <Button variant="ghost" className="text-gray-600">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại Dự án
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Danh sách Ứng viên
            </h1>
            <p className="text-gray-500">
              Quản lý các ứng viên cho dự án "Hospital Administration".
            </p>
          </div>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-2" />
            Thêm Ứng viên
          </Button>
        </div>

        {/* === 2. THANH CÔNG CỤ (TOOLBAR) === */}
        <div className="flex items-center gap-4 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm theo tên ứng viên..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <ListFilter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="Pending">Chờ duyệt (Pending)</SelectItem>
              <SelectItem value="Interviewing">Phỏng vấn (Interviewing)</SelectItem>
              <SelectItem value="Hired">Đã tuyển (Hired)</SelectItem>
              <SelectItem value="Rejected">Từ chối (Rejected)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* === 3. BẢNG DỮ LIỆU (DATA TABLE) === */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="min-w-[250px]">Ứng viên</TableHead>
                  <TableHead>Ngày ứng tuyển</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-center">CV</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>

                    {/* Cột "Ứng viên" (Avatar + Tên) */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {/* (Bạn có thể thêm AvatarImage nếu có) */}
                          <AvatarFallback>
                            {candidate.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-gray-500">
                            {candidate.userId}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Cột "Ngày ứng tuyển" */}
                    <TableCell>{formatDate(candidate.appliedAt)}</TableCell>

                    {/* Cột "Trạng thái" (Badge) */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`font-semibold ${getStatusColor(
                          candidate.status,
                        )}`}
                      >
                        {candidate.status}
                      </Badge>
                    </TableCell>

                    {/* Cột "CV" (Button Icon) */}
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a href={candidate.cvUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>

                    {/* Cột "Hành động" (Menu) */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem>Chuyển sang Phỏng vấn</DropdownMenuItem>
                          <DropdownMenuItem>Đánh dấu là Đã tuyển</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Từ chối ứng viên
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* (Bạn có thể thêm phần Phân trang (Pagination) ở đây) */}
      </div>
    </div>
  )
}

export default CandidateListPage