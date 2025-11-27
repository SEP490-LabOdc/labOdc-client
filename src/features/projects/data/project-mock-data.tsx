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

export interface Milestone {
  id: string;
  name: string;
  status: string;
  progress: number;
  dueDate: string;
  description: string;
  totalTasks: number;
  completedTasks: number;
  team: TeamMember[];
  teamLead: TeamMember[];
}

export const milestones: Milestone[] = [
  {
    id: 'milestone-1',
    name: 'Giai đoạn 1: Khởi tạo & Phân tích',
    status: 'Completed',
    progress: 100,
    dueDate: '30 Jan 2026',
    description: 'Thu thập yêu cầu chi tiết từ khách hàng, phân tích nghiệp vụ và xác định phạm vi dự án. Chốt tài liệu đặc tả yêu cầu (SRS).',
    totalTasks: 10,
    completedTasks: 10,
    team: [
      { name: 'Alice', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice' },
      { name: 'Bob', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bob' }
    ],
    teamLead: [
      { name: 'Ruth', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ruth' }
    ]
  },
  {
    id: 'milestone-2',
    name: 'Giai đoạn 2: Thiết kế & Lên kế hoạch',
    status: 'InProgress',
    progress: 60,
    dueDate: '15 Mar 2026',
    description: 'Thiết kế wireframe, high-fidelity mockups (UI/UX), và thiết kế kiến trúc hệ thống (System Architecture).',
    totalTasks: 15,
    completedTasks: 9,
    team: [
      { name: 'Charlie', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie' },
      { name: 'David', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=David' },
      { name: 'Eve', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Eve' }
    ],
    teamLead: [
      { name: 'Meredith', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Meredith' }
    ]
  },
  {
    id: 'milestone-3',
    name: 'Giai đoạn 3: Phát triển (Development)',
    status: 'Pending',
    progress: 0,
    dueDate: '01 Jul 2026',
    description: 'Tiến hành code các module chức năng theo kế hoạch, bao gồm cả front-end và back-end. Tích hợp các API cần thiết.',
    totalTasks: 25,
    completedTasks: 0,
    team: [
      { name: 'Frank', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Frank' },
      { name: 'Grace', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Grace' }
    ],
    teamLead: [
      { name: 'Dwight', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dwight' }
    ]
  },
  {
    id: 'milestone-4',
    name: 'Giai đoạn 4: Kiểm thử & Triển khai',
    status: 'Pending',
    progress: 0,
    dueDate: '15 Aug 2026',
    description: 'Kiểm thử (QA/QC) toàn diện hệ thống, sửa lỗi và chuẩn bị cho việc triển khai (Go-live) lên môi trường production.',
    totalTasks: 20,
    completedTasks: 0,
    team: [],
    teamLead: []
  },
]

export const milestoneTasks: Task[] = [
  {
    id: 101,
    name: 'Thiết kế Wireframes cho trang Quản lý Bệnh nhân',
    status: 'Completed',
    assignees: [
      { name: 'Leona', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Leona' }
    ],
    completed: true
  },
  {
    id: 102,
    name: 'Thiết kế Mockups (UI) - Giao diện Bác sĩ',
    status: 'Completed',
    assignees: [
      { name: 'Leona', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Leona' },
      { name: 'Pinero', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Pinero' }
    ],
    completed: true
  },
  {
    id: 103,
    name: 'Xây dựng Luồng người dùng (UX Flow) cho Đặt lịch hẹn',
    status: 'InProgress',
    assignees: [
      { name: 'Lewis', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lewis' }
    ],
    completed: false
  },
  {
    id: 104,
    name: 'Thiết kế Cơ sở dữ liệu (Database Schema)',
    status: 'Pending',
    assignees: [
      { name: 'Moseley', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Moseley' }
    ],
    completed: false
  },
  {
    id: 105,
    name: 'Viết tài liệu Kiến trúc hệ thống',
    status: 'InProgress',
    assignees: [
      { name: 'Moseley', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Moseley' }
    ],
    completed: false
  },
]

export interface Report {
  id: string;
  name: string;
  generatedOn: string;
  generatedBy: TeamMember;
}

export const milestoneReports: Report[] = [
  {
    id: 'REP-001',
    name: 'Báo cáo tiến độ tuần 1 (GĐ 2)',
    generatedOn: '20 Feb 2026',
    generatedBy: { name: 'Dwight', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dwight' }
  },
  {
    id: 'REP-002',
    name: 'Báo cáo tiến độ tuần 2 (GĐ 2)',
    generatedOn: '27 Feb 2026',
    generatedBy: { name: 'Dwight', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dwight' }
  },
  {
    id: 'REP-003',
    name: 'Báo cáo rà soát UI/UX',
    generatedOn: '01 Mar 2026',
    generatedBy: { name: 'Leona', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Leona' }
  },
];

// Dữ liệu mock cho tab Tài liệu
export const milestoneDocuments: File[] = [
  {
    id: 1,
    name: 'Wireframes_v2.fig',
    size: '15.2 MB',
    uploadedBy: { name: 'Leona', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Leona' },
    uploadedOn: '18 Feb 2026, 3:45 PM',
    type: 'figma'
  },
  {
    id: 2,
    name: 'System_Architecture_Draft.pdf',
    size: '2.1 MB',
    uploadedBy: { name: 'Moseley', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Moseley' },
    uploadedOn: '22 Feb 2026, 10:10 AM',
    type: 'pdf'
  },
  {
    id: 3,
    name: 'User_Flow_Diagrams.zip',
    size: '8.7 MB',
    uploadedBy: { name: 'Lewis', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lewis' },
    uploadedOn: '25 Feb 2026, 11:00 AM',
    type: 'zip'
  },
];