import React from 'react'
import { Badge } from '@/components/ui/badge' // Cần thiết cho 'activities'

// --- Định nghĩa Types ---
export interface TeamMember {
  name: string;
  avatar: string;
}

export interface ProjectData {
  name: string;
  id: string;
  status: string;
  client: string;
  totalCost: number;
  hoursOfWork: number;
  createdOn: string;
  startedOn: string;
  dueDate: string;
  dueDateTag: string;
  createdBy: TeamMember;
  priority: string;
  teamLead: TeamMember[];
  projectManager: TeamMember;
  team: TeamMember[];
  tags: string[];
  description: string;
  timeSpent: number;
  totalHours: number;
}

export interface Task {
  id: number;
  name: string;
  status: string;
  assignees: TeamMember[];
  completed: boolean;
}

export interface File {
  id: number;
  name: string;
  size: string;
  uploadedBy: TeamMember;
  uploadedOn: string;
  type: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Activity {
  id: number;
  user: TeamMember;
  action: string;
  timestamp: string;
  detail?: React.ReactNode;
}

export interface Invoice {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: string;
}

// --- Dữ liệu Mock ---

export const projectData: ProjectData = {
  name: 'Hospital Administration',
  id: 'PRO-0004',
  status: 'InProgress',
  client: 'EcoVision Enterprises',
  totalCost: 1400,
  hoursOfWork: 150,
  createdOn: '14 Nov 2026',
  startedOn: '15 Jan 2026',
  dueDate: '15 Nov 2026',
  dueDateTag: '01',
  createdBy: {
    name: 'Cameron',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Cameron'
  },
  priority: 'High',
  teamLead: [
    { name: 'Ruth', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ruth' },
    { name: 'Meredith', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Meredith' }
  ],
  projectManager: { name: 'Dwight', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dwight' },
  team: [
    { name: 'Lewis', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lewis' },
    { name: 'Leona', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Leona' },
    { name: 'Pinero', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Pinero' },
    { name: 'Moseley', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Moseley' }
  ],
  tags: ['Admin Panel', 'High Tech'],
  description: 'The Enhanced Patient Management System (EPMS) project aims to modernize and streamline the patient management processes within. By integrating advanced technologies and optimizing existing workflows, the project seeks to improve patient care, enhance operational efficiency, and ensure compliance with regulatory standards.',
  timeSpent: 65,
  totalHours: 120
}

export const tasks: Task[] = [
  {
    id: 1,
    name: 'Patient appointment booking',
    status: 'OnHold',
    assignees: [
      { name: 'Alice', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice' },
      { name: 'Bob', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bob' }
    ],
    completed: false
  },
  {
    id: 2,
    name: 'Appointment booking with payment gateway',
    status: 'Inprogress',
    assignees: [
      { name: 'Charlie', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie' }
    ],
    completed: false
  },
  {
    id: 3,
    name: 'Private chat-module',
    status: 'Pending',
    assignees: [
      { name: 'David', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=David' },
      { name: 'Eve', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Eve' }
    ],
    completed: false
  },
  {
    id: 4,
    name: 'Go-Live and Post-Implementation Support',
    status: 'Inprogress',
    assignees: [
      { name: 'Frank', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Frank' }
    ],
    completed: false
  }
]

export const files: File[] = [
  {
    id: 1,
    name: 'Project_1.docx',
    size: '7.6 MB',
    uploadedBy: { name: 'Cameron', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Cameron' },
    uploadedOn: '15 May 2024, 6:53 PM',
    type: 'docx'
  },
  {
    id: 2,
    name: 'Proposal.pdf',
    size: '12.6 MB',
    uploadedBy: { name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=JohnDoe' },
    uploadedOn: '15 May 2024, 6:53 PM',
    type: 'pdf'
  },
  {
    id: 3,
    name: 'Logo-Img.zip',
    size: '6.2 MB',
    uploadedBy: { name: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=JaneSmith' },
    uploadedOn: '15 May 2024, 6:53 PM',
    type: 'zip'
  }
]

export const projectImages: string[] = [
  'https://images.unsplash.com/photo-1579154443190-ac2d3587b99c?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1603988582236-ff4a73722976?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1533035353720-f1c6a2d97d51?q=80&w=2803&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1664472879555-520e5c8e3181?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1582719266785-05572620a233?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1603988582236-ff4a73722976?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

export const notes: Note[] = [
  {
    id: 1,
    title: 'Changes & design',
    content: 'An office management app project streamlines administrative tasks by integrating tools for scheduling, communication, and task management, enhancing overall productivity and efficiency.',
    date: '15 May 2025',
    author: 'Admin'
  },
  {
    id: 2,
    title: 'Changes & design',
    content: 'An office management app project streamlines administrative tasks by integrating tools for scheduling, communication, and task management, enhancing overall productivity and efficiency.',
    date: '15 May 2025',
    author: 'Admin'
  }
]

export const activities: Activity[] = [
  {
    id: 1,
    user: { name: 'Andrew', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Andrew' },
    action: 'added a New Task',
    timestamp: '15 May 2024, 6:53 PM'
  },
  {
    id: 2,
    user: { name: 'Jermai', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jermai' },
    action: `Moved task "Private chat module"`,
    detail: (
      <>
        <Badge className="bg-green-100 text-green-800 rounded-md text-xs">Completed</Badge>
        <Badge className="bg-purple-100 text-purple-800 rounded-md text-xs">Inprogress</Badge>
      </>
    ),
    timestamp: '15 May 2024, 6:53 PM'
  },
  {
    id: 3,
    user: { name: 'Jermai', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jermai' },
    action: `Created task "Private chat module"`,
    timestamp: '15 May 2024, 6:53 PM'
  },
  {
    id: 4,
    user: { name: 'Hendry', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hendry' },
    action: `Updated Image "logo.jpg"`,
    timestamp: '15 May 2024, 6:53 PM'
  }
]

export const invoices: Invoice[] = [
  {
    id: 'INV-123',
    name: 'Phase 2 Completion',
    date: '11 Sep 2025, 05:35 PM',
    amount: 6598,
    status: 'Paid'
  },
  {
    id: 'INV-124',
    name: 'Advance for Project',
    date: '14 Sep 2025, 05:35 PM',
    amount: 3312,
    status: 'Hold'
  },
  {
    id: 'INV-125',
    name: 'Changes & design Alignments',
    date: '14 Sep 2025, 05:35 PM',
    amount: 41.54,
    status: 'Paid'
  },
  {
    id: 'INV-126',
    name: 'Added New Functionality',
    date: '14 Sep 2025, 05:35 PM',
    amount: 6598,
    status: 'Paid'
  },
  {
    id: 'INV-127',
    name: 'Phase 1 Completion',
    date: '17 Sep 2025, 05:35 PM',
    amount: 1259,
    status: 'Unpaid'
  }
]