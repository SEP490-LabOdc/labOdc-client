import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Calendar,
  Building2,
  FileText,
} from 'lucide-react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { toast } from 'sonner'

import type { Checklist } from '@/hooks/api/company-checklist-config'
import { useDeleteCompanyChecklist } from '@/hooks/api/company-checklist-config'

interface ChecklistTableProps {
  checklists: Checklist[]
  onRefresh: () => void
}

export function ChecklistTable({ checklists, onRefresh }: ChecklistTableProps) {
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  const deleteMutation = useDeleteCompanyChecklist()

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  const handleView = (checklist: Checklist) => {
    setSelectedChecklist(checklist)
    // reset expanded state khi mở checklist khác (tuỳ bạn)
    setExpandedGroups(new Set())
  }

  const handleEdit = (checklist: Checklist) => {
    toast.info('Chức năng chỉnh sửa chưa được triển khai.')
    console.log('Edit checklist:', checklist.id)
  }

  const handleDelete = async (checklist: Checklist) => {
    try {
      await deleteMutation.mutateAsync(checklist.id)
      toast.success('Xóa check-list thành công!')
      if (selectedChecklist?.id === checklist.id) setSelectedChecklist(null)
      onRefresh()
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Xóa check-list thất bại!')
      console.error(e)
    }
  }

  const getEntityTypeLabel = (entityType: string) => {
    const labels: Record<string, string> = {
      COMPANY_REGISTRATION: 'Đăng ký công ty',
      PROJECT_SUBMISSION: 'Nộp dự án',
      TALENT_APPLICATION: 'Ứng tuyển tài năng',
    }
    return labels[entityType] || entityType
  }

  const getEntityTypeClass = (entityType: string) => {
    const classes: Record<string, string> = {
      COMPANY_REGISTRATION: 'bg-blue-100 text-blue-800',
      PROJECT_SUBMISSION: 'bg-green-100 text-green-800',
      TALENT_APPLICATION: 'bg-purple-100 text-purple-800',
    }
    return classes[entityType] || 'bg-gray-100 text-gray-800'
  }

  const countItems = (checklist: Checklist) =>
    checklist.groups.reduce((total, g) => total + (g.items?.length ?? 0), 0)

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[320px]">Tên Check-list</TableHead>
            <TableHead className="w-[220px]">Loại</TableHead>
            <TableHead className="w-[160px]">Ngày tạo</TableHead>
            <TableHead className="w-[120px]">Nhóm</TableHead>
            <TableHead className="w-[120px]">Mục</TableHead>
            <TableHead className="w-[100px]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {checklists.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-8 w-8 text-muted-foreground/50" />
                  <span>Không có check-list nào phù hợp.</span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            checklists.map((checklist) => (
              <TableRow key={checklist.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-semibold">{checklist.name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {checklist.description}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={getEntityTypeClass(checklist.entityType)}>
                    {getEntityTypeLabel(checklist.entityType)}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {format(new Date(checklist.createdAt), 'dd/MM/yyyy', { locale: vi })}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{checklist.groups.length}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-600">{countItems(checklist)}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>

                      <DropdownMenuItem onClick={() => handleView(checklist)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleEdit(checklist)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => handleDelete(checklist)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Details */}
      {selectedChecklist && (
        <div className="mt-6 p-6 border rounded-lg bg-card">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold">{selectedChecklist.name}</h3>
              <p className="text-muted-foreground mt-1">{selectedChecklist.description}</p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                <Badge className={getEntityTypeClass(selectedChecklist.entityType)}>
                  {getEntityTypeLabel(selectedChecklist.entityType)}
                </Badge>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(selectedChecklist.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => setSelectedChecklist(null)}>
              Đóng
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Building2 className="h-4 w-4" />
              Nhóm kiểm tra ({selectedChecklist.groups.length})
            </div>

            {selectedChecklist.groups
              .slice()
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((group) => (
                <Collapsible
                  key={group.id}
                  open={expandedGroups.has(group.id)}
                  onOpenChange={() => toggleGroup(group.id)}
                  className="border rounded-lg"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {expandedGroups.has(group.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span className="font-medium">{group.title}</span>
                    </div>
                    <Badge variant="outline">{group.items.length} mục</Badge>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="px-4 pb-4">
                    <div className="space-y-2 mt-2">
                      {group.items
                        .slice()
                        .sort((a, b) => a.displayOrder - b.displayOrder)
                        .map((item) => (
                          <div key={item.id} className="flex items-start gap-3 p-3 rounded bg-muted/30">
                            <div className="mt-0.5">
                              {item.required ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <span className="text-sm">{item.content}</span>
                              {item.required && (
                                <Badge variant="secondary" className="text-xs ml-2">
                                  Bắt buộc
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
