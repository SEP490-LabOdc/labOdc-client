import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BellIcon } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export function NotificationDropdown() {
    const notification = [
        {
            "id": "notif_001",
            "title": "Project Assigned",
            "message": "You have been assigned to lead the project 'E-Commerce ODC Setup'.",
            "type": "project",
            "status": "unread",
            "createdAt": "2025-09-21T14:30:00Z",
            "actor": {
                "id": "admin_01",
                "role": "Lab Admin",
                "name": "Nguyen Van A"
            },
            "target": {
                "id": "project_501",
                "name": "E-Commerce ODC Setup"
            }
        },
        {
            "id": "notif_002",
            "title": "Application Reviewed",
            "message": "Your application for 'Backend Developer' was approved by Mentor B.",
            "type": "talent_application",
            "status": "unread",
            "createdAt": "2025-09-21T09:10:00Z",
            "actor": {
                "id": "mentor_12",
                "role": "Mentor",
                "name": "Tran B"
            },
            "target": {
                "id": "application_778",
                "position": "Backend Developer"
            }
        },
        {
            "id": "notif_003",
            "title": "Enterprise Invitation",
            "message": "Enterprise 'TechCorp' invited your team to join their ODC trial project.",
            "type": "enterprise_invite",
            "status": "read",
            "createdAt": "2025-09-20T17:45:00Z",
            "actor": {
                "id": "enterprise_99",
                "role": "Enterprise",
                "name": "TechCorp"
            },
            "target": {
                "id": "team_310",
                "name": "Team Alpha"
            }
        },
        {
            "id": "notif_004",
            "title": "System Maintenance",
            "message": "LabODC platform will be under maintenance on Sept 23, 02:00–04:00 UTC.",
            "type": "system",
            "status": "unread",
            "createdAt": "2025-09-19T12:00:00Z",
            "actor": {
                "id": "system",
                "role": "System Bot",
                "name": "LabODC"
            },
            "target": null
        },
        {
            "id": "notif_005",
            "title": "New Message",
            "message": "You have a new message from Mentor C in 'AI Research Project' chat.",
            "type": "chat",
            "status": "unread",
            "createdAt": "2025-09-21T16:20:00Z",
            "actor": {
                "id": "mentor_45",
                "role": "Mentor",
                "name": "Le C"
            },
            "target": {
                "id": "chat_556",
                "name": "AI Research Project"
            }
        }
    ]

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className="relative me-5">
                    <Button variant='ghost' size='icon' className={cn('rounded-full size-10')}>
                        <BellIcon className='hover:cursor-pointer size-7' />
                    </Button>
                    <span className=" text-white absolute top-0 right-0 px-1 min-w-4 translate-x-1/2 -translate-y-1/3 origin-center flex items-center justify-center rounded-full text-xs bg-destructive">
                        2
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-100' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm leading-none font-medium'>Thông báo</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {notification.map((item) => (
                        <div key={item.id} className='p-2'>
                            <p>{item.title}</p>
                            <p className='text-accent-foreground'>{item.message}</p>
                        </div>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
