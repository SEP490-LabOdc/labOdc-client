import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FileText, Download, Plus } from 'lucide-react'
import type { Report } from '../../data/project-mock-data'

interface MilestoneReportsTabProps {
  reports: Report[];
}

export const MilestoneReportsTab: React.FC<MilestoneReportsTabProps> = ({ reports }) => {
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
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <FileText className="h-8 w-8 text-blue-500 flex-shrink-0 mr-4" />
              <div className="flex-grow">
                <p className="font-medium text-gray-800">{report.name}</p>
                <p className="text-sm text-gray-500">
                  Tạo ngày: {report.generatedOn}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm text-gray-500">Tạo bởi:</span>
                <Avatar className="h-7 w-7">
                  <AvatarImage src={report.generatedBy.avatar} />
                  <AvatarFallback className="text-xs">{report.generatedBy.name[0]}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

