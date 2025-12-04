import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Plus, FileText, Download, Loader2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { UploadFileModal } from './upload-file-modal'
import { useGetProjectDocuments } from '@/hooks/api/projects/queries'

export interface ProjectDocument {
  id: string
  projectId: string
  documentName: string
  documentUrl: string
  documentType: string
  uploadedAt: string
}

interface ProjectFilesTabProps {
  projectImages: string[]
  projectId: string
}

export const ProjectFilesTab: React.FC<ProjectFilesTabProps> = ({
  projectImages,
  projectId,
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  // Sử dụng hook đã có để fetch documents
  const { data: documentsResponse, isLoading, refetch } = useGetProjectDocuments(projectId)

  const files = documentsResponse?.data || []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
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

  const handleRefresh = () => {
    refetch()
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Phần Images */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {projectImages.map((src, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <img src={src} alt={`Project Image ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="secondary" size="sm" onClick={() => handleViewFile(src)}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Phần Files */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Files</h3>
            <Button
              size="sm"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New
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
                    className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="h-8 w-8 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate">{file.documentName}</p>
                        <p className="text-sm text-gray-500">
                          {file.documentType.toUpperCase()} • {formatDate(file.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
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
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
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
