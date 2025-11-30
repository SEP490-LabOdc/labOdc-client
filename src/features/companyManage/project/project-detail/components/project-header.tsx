import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export const ProjectPageHeader: React.FC = () => {
  return (
    <div className="bg-white px-6 py-4 border-b flex items-center justify-between">
      <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
        <ChevronLeft className="h-4 w-4" />
        Quay lại danh sách dự án
      </Button>
    </div>
  )
}