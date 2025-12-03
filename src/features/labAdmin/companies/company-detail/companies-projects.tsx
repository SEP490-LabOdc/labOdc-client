import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderOpen } from 'lucide-react'

interface CompanyProjectsProps {
    projects?: any[]
}

export const CompanyProjects: React.FC<CompanyProjectsProps> = ({ projects = [] }) => {
    const hasProjects = projects && projects.length > 0

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Dự án của công ty</CardTitle>
            </CardHeader>

            <CardContent className="p-6">
                {!hasProjects ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 text-gray-500">
                        <FolderOpen className="h-12 w-12 mb-3 text-gray-400" />
                        <p className="text-sm font-medium">Công ty chưa có dự án nào</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                            >
                                <h3 className="font-semibold text-gray-800">{project.title}</h3>
                                <p className="text-xs text-gray-500">Mã dự án: {project.id}</p>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
