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