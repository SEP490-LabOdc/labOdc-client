import React from 'react'
import { Card } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface ProjectSelectorProps {
    projects: any[]
    selectedProjectId: string
    onProjectChange: (projectId: string) => void
    isLoading: boolean
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
    projects,
    selectedProjectId,
    onProjectChange,
    isLoading
}) => {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    Chọn dự án:
                </label>
                <Select
                    value={selectedProjectId}
                    onValueChange={onProjectChange}
                    disabled={isLoading}
                >
                    <SelectTrigger className="w-full max-w-md">
                        <SelectValue placeholder={isLoading ? "Đang tải..." : "Chọn dự án"} />
                    </SelectTrigger>
                    <SelectContent>
                        {projects.length > 0 ? (
                            projects.map((project: any) => (
                                <SelectItem key={project.id} value={project.id}>
                                    {project.title || project.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="no-projects" disabled>
                                Không có dự án nào
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

