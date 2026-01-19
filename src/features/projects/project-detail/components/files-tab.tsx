import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Plus, FileText, Download, Loader2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UploadFileModal } from './upload-file-modal'
import { useGetProjectDocuments } from '@/hooks/api/projects/queries'
import { formatDateOnly } from '@/helpers/datetime'
import { usePermission } from '@/hooks/usePermission'
import { ROLE } from '@/const'
import { useDeleteProjectDocument } from '@/hooks/api/projects/mutation'
import { useQueryClient } from '@tanstack/react-query'
import { projectKeys } from '@/hooks/api/projects/query-keys'
import { toast } from 'sonner'

export interface ProjectDocument {
  id: string
  projectId: string
  documentName: string
  documentUrl: string
  documentType: string
  uploadedAt: string
}

interface ProjectFilesTabProps {
  projectId: string
}

export const ProjectFilesTab = ({
  projectId,
}: ProjectFilesTabProps) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const { hasRole } = usePermission()
  const queryClient = useQueryClient()

  // Sử dụng hook đã có để fetch documents
  const { data: documentsResponse, isLoading, refetch } = useGetProjectDocuments(projectId)
  const deleteDocumentMutation = useDeleteProjectDocument()

  const files = documentsResponse?.data || []

  // Chỉ company mới có thể thêm file mới
  const canAddFile = hasRole(ROLE.COMPANY)

  // Chỉ company mới có thể xóa file
  const canDeleteFile = hasRole(ROLE.COMPANY)


  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewFile = (url: string) => {
    window.open(url, '_blank')
  }

  const handleRefresh = () => {
    refetch()
  }

  const handleDelete = async (documentId: string) => {
    if (!canDeleteFile) {
      toast.error('Bạn không có quyền xóa tài liệu')
      return
    }

    try {
      await deleteDocumentMutation.mutateAsync(documentId)
      toast.success('Xóa tài liệu thành công')
      await queryClient.invalidateQueries({
        queryKey: projectKeys.getProjectDocuments(projectId)
      })
    } catch (error) {
      console.error(error)
      toast.error('Xóa tài liệu thất bại')
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Phần Files */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tài liệu</h3>
            {canAddFile && (
              <Button
                size="sm"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm mới
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Đang tải...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {files.length > 0 ? (
                files.map((file: ProjectDocument) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border border-primary/20 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="h-8 w-8 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{file.documentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.documentType.toUpperCase()} • {formatDateOnly(file.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDownload(file.documentUrl, file.documentName)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewFile(file.documentUrl)}>
                            Xem
                          </DropdownMenuItem>
                          {canDeleteFile && (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(file.id)}
                              disabled={deleteDocumentMutation.isPending}
                            >
                              {deleteDocumentMutation.isPending ? 'Đang xóa...' : 'Xóa'}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm">Chưa có tài liệu nào</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <UploadFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        projectId={projectId}
        onSuccess={handleRefresh}
      />
    </Card>
  )
}
