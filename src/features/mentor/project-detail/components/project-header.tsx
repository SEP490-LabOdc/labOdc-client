import React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronLeft, Edit, MoreHorizontal } from 'lucide-react'

export const ProjectPageHeader: React.FC = () => {
  return (
    <div className="bg-white px-6 py-4 border-b flex items-center justify-between">
      <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
        <ChevronLeft className="h-4 w-4" />
        Back to List
      </Button>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700">
          <Edit className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}