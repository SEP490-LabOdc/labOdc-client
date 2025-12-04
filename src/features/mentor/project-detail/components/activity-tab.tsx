import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import type { Activity, Note } from '@/hooks/api/projects'

interface ProjectActivityTabProps {
  notes: Note[];
  activities: Activity[];
}

export const ProjectActivityTab: React.FC<ProjectActivityTabProps> = ({ notes, activities }) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Phần Notes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Notes</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-800">{note.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{note.content}</p>
                <p className="text-xs text-gray-500 mt-2">{note.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Đường phân cách */}
        <Separator />

        {/* Phần Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Activity</h3>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3 items-start">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.user.name}</span>{' '}
                    {activity.action}
                    {activity.detail && <span className="ml-2 flex items-center gap-1">{activity.detail}</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}