import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'

export const MilestoneReportsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Danh sách Báo cáo</CardTitle>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Tạo Báo cáo
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-sm">Chưa có báo cáo nào</p>
        </div>
      </CardContent>
    </Card>
  )
}
