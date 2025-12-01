import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Plus, FileText } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getStatusColor } from '@/lib/utils'
import type { Invoice } from '@/hooks/api/projects'

interface ProjectInvoicesTabProps {
  invoices: Invoice[];
}

export const ProjectInvoicesTab: React.FC<ProjectInvoicesTabProps> = ({ invoices }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Invoices</CardTitle>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <FileText className="h-8 w-8 text-gray-500 flex-shrink-0 mr-4" />
              <div className="flex-grow">
                <p className="font-medium text-gray-800">{invoice.name}</p>
                <p className="text-sm text-gray-500">#{invoice.id} {invoice.date}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="font-medium text-lg text-gray-800">${invoice.amount}</span>
                <Badge className={`${getStatusColor(invoice.status)} rounded-full px-3 py-1 text-xs`}>
                  {invoice.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Send</DropdownMenuItem>
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