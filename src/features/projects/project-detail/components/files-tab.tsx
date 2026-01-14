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

  // Sử dụng hook đã có để fetch documents
  const { data: documentsResponse, isLoading, refetch } = useGetProjectDocuments(projectId)

  const files = documentsResponse?.data || []


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

  return (
    <Card>
      <CardContent className="p-6 space-y-6">


        {/* Phần Files */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tài liệu</h3>
            <Button
              size="sm"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm mới
            </Button>
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
                          <DropdownMenuItem className="text-destructive">Xóa</DropdownMenuItem>
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
