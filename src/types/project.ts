// src/types/project.ts

// Dựa trên Project.java
export type Project = {
    id: string
    companyId: string
    mentorId?: string
    title: string
    description: string
    status: string // PENDING, ACTIVE, COMPLETED, CANCELLED, etc.
    startDate: string // ISO date string
    endDate?: string // ISO date string, có thể null
    budget?: number // BigDecimal -> number
    skills?: Skill[] // Set<Skill> -> Skill[]
    createdAt?: string
    updatedAt?: string
}

// Dựa trên Skill.java
export type Skill = {
    id: string
    name: string
    description?: string
}

// Dựa trên ProjectMember.java
export type ProjectMember = {
    id: string
    userId: string
    roleInProject?: string
    isLeader: boolean
    projectId: string
    createdAt?: string
    updatedAt?: string
}

// Dựa trên ProjectMilestone.java
export type ProjectMilestone = {
    id: string
    title: string
    description?: string
    startDate?: string // ISO date string
    endDate?: string // ISO date string
    status: string // PENDING, IN_PROGRESS, COMPLETED, etc.
    projectId: string
    createdAt?: string
    updatedAt?: string
}

// Dựa trên Report.java
export type Report = {
    id: string
    reporterId: string
    recipientId?: string
    reportType: string
    reportingDate: string // ISO date string
    content: string
    status: string // PENDING, APPROVED, REJECTED, etc.
    attachmentsUrl?: string[] // List<String>
    projectId: string
    parentReportId?: string
    createdAt?: string
    updatedAt?: string
}

// Dựa trên ProjectApplication.java
export type ProjectApplication = {
    id: string
    userId: string
    cvUrl: string
    status: string // PENDING, APPROVED, REJECTED, etc.
    appliedAt: string // ISO datetime string
    reviewedBy?: string
    reviewNotes?: string
    aiScanResult?: Record<string, unknown> // Map<String, Object>
    projectId: string
    createdAt?: string
    updatedAt?: string
}

// Dựa trên ProjectDocument.java
export type ProjectDocument = {
    id: string
    documentName: string
    documentUrl: string
    documentType?: string
    uploadedAt?: string // ISO datetime string
    projectId: string
    createdAt?: string
    updatedAt?: string
}