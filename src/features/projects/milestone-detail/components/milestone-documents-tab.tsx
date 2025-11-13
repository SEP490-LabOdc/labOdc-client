import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Plus, FileText, Download } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { File as ProjectFile } from '../../data/project-mock-data' // Dùng lại interface 'File'

interface MilestoneDocumentsTabProps {
  documents: ProjectFile[];
}

export const MilestoneDocumentsTab: React.FC<MilestoneDocumentsTabProps> = ({ documents }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Tài liệu Cột mốc</CardTitle>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Tải lên
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((file) => (
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
      </CardContent>
    </Card>
  )
}