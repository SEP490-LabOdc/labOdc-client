import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Plus, Download, MoreHorizontal, Loader2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGetProjectMilestoneDocuments } from '@/hooks/api/projects/queries'
import { usePermission } from '@/hooks/usePermission'
import { ROLE } from '@/const.ts'
import { CreateDocumentModal } from './create-document-modal.tsx'
import { formatDate } from '@/helpers/datetime'

interface MilestoneDocument {
  id: string
  fileName: string
  fileUrl: string
  s3Key: string
  uploadedAt: string
  entityId: string
}

interface MilestoneDocumentsTabProps {
  milestoneId: string
}

export const MilestoneDocumentsTab: React.FC<MilestoneDocumentsTabProps> = ({ milestoneId }) => {
  const { hasRole } = usePermission()
  const isMentor = hasRole(ROLE.MENTOR)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { data: documentsResponse, isLoading, error, refetch } = useGetProjectMilestoneDocuments(milestoneId)

  const documents: MilestoneDocument[] = documentsResponse?.data || []

  const handleCreateSuccess = async () => {
    await refetch()
  }


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

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Tài liệu Milestone</CardTitle>
          {isMentor && (
            <Button
              size="sm"
              className="bg-[#2a9d8f] hover:bg-[#2a9d8f]/90"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tải lên
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Đang tải tài liệu...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-red-400" />
              <p className="text-sm">Lỗi khi tải tài liệu</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm">Chưa có tài liệu nào</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((document: MilestoneDocument) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border rounded-md bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-8 w-8 text-gray-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">{document.fileName}</p>
                      <p className="text-sm text-gray-500">
                        Tải lên: {formatDate(document.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDownload(document.fileUrl, document.fileName)}
                      title="Tải xuống"
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
                        <DropdownMenuItem onClick={() => handleViewFile(document.fileUrl)}>
                          Xem tài liệu
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem className="text-red-600">
                          Xóa
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CreateDocumentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
        milestoneId={milestoneId}
      />
    </>
  )
}
