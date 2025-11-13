import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Plus, FileText, Download } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import type { File as ProjectFile } from '../../data/project-mock-data'

interface ProjectFilesTabProps {
  projectImages: string[];
  files: ProjectFile[];
}

export const ProjectFilesTab: React.FC<ProjectFilesTabProps> = ({ projectImages, files }) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Phần Images */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {projectImages.map((src, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <img src={src} alt={`Project Image ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="secondary" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Đường phân cách */}
        <Separator />

        {/* Phần Files */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Files</h3>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {file.size} • {file.uploadedOn}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={file.uploadedBy.avatar} />
                    <AvatarFallback className="text-xs">{file.uploadedBy.name[0]}</AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}