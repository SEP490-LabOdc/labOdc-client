import { useState } from 'react'
import { Main } from '@/components/layout/main'
import { useGetSystemConfigs } from '@/hooks/api/system-config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Settings, AlertCircle, X, Plus } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getConfigEditor, hasConfigEditor, CreateConfigDialog } from './components'
import { SystemConfigsTable } from './components/system-configs-table'
import { cn } from '@/lib/utils'
import type { SystemConfig } from '@/hooks/api/system-config/types'
import { Button } from '@/components/ui/button'

export default function SystemConfigPage() {
    const { data, isLoading, isError, error, refetch } = useGetSystemConfigs(1, 10)

    // Get all configs
    const configs = data?.data?.data || []

    // Selected config for editing
    const [selectedConfig, setSelectedConfig] = useState<SystemConfig | null>(null)

    // Dialog state
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

    const handleSelectConfig = (config: SystemConfig | null) => {
        setSelectedConfig(config)
    }

    const handleCreateSuccess = () => {
        refetch()
        setSelectedConfig(null)
    }

    if (isLoading) {
        return (
            <Main>
                <div className="space-y-6">
                    <div>
                        <div className="h-8 w-64 animate-pulse rounded-md bg-gray-200 mb-2" />
                        <div className="h-4 w-96 animate-pulse rounded-md bg-gray-200" />
                    </div>
                    <Separator />
                    <div className="rounded-md border">
                        <div className="p-4 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-12 w-full animate-pulse rounded-md bg-gray-200" />
                            ))}
                        </div>
                    </div>
                </div>
            </Main>
        )
    }

    if (isError) {
        return (
            <Main>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>
                        {error?.message || 'Không thể tải cấu hình hệ thống'}
                    </AlertDescription>
                </Alert>
            </Main>
        )
    }

    return (
        <Main>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Settings className="h-8 w-8" />
                            Cấu hình hệ thống
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Quản lý các cấu hình phân chia phí và tỷ lệ trong hệ thống
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="bg-[#2a9d8f] hover:bg-[#1e7a6e]"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Tạo cấu hình mới
                    </Button>
                </div>

                <Separator />

                {configs.length === 0 ? (
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Không có cấu hình</AlertTitle>
                        <AlertDescription>
                            Không tìm thấy cấu hình hệ thống. Vui lòng liên hệ quản trị viên.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <div className={cn(
                        'grid gap-6',
                        selectedConfig ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
                    )}>
                        {/* Left: Table */}
                        <div className={selectedConfig ? 'lg:col-span-1' : 'col-span-1'}>
                            <SystemConfigsTable
                                data={configs}
                                selectedConfig={selectedConfig}
                                onSelectConfig={handleSelectConfig}
                            />
                        </div>

                        {/* Right: Editor */}
                        {selectedConfig && (
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    {selectedConfig.name === 'fee-distribution'
                                                        ? 'Cấu hình phân chia phí'
                                                        : selectedConfig.name}
                                                </CardTitle>
                                                <CardDescription className="mt-1">
                                                    {selectedConfig.description}
                                                </CardDescription>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedConfig(null)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {hasConfigEditor(selectedConfig.name) ? (
                                            (() => {
                                                const Editor = getConfigEditor(selectedConfig.name)
                                                return Editor ? (
                                                    <Editor config={selectedConfig as SystemConfig<any>} />
                                                ) : (
                                                    <Alert>
                                                        <AlertCircle className="h-4 w-4" />
                                                        <AlertTitle>Lỗi</AlertTitle>
                                                        <AlertDescription>
                                                            Không tìm thấy editor cho loại cấu hình này.
                                                        </AlertDescription>
                                                    </Alert>
                                                )
                                            })()
                                        ) : (
                                            <Alert>
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertTitle>Chưa hỗ trợ</AlertTitle>
                                                <AlertDescription>
                                                    Loại cấu hình này chưa có editor. Vui lòng liên hệ quản trị viên.
                                                </AlertDescription>
                                            </Alert>
                                        )}

                                        {/* Last Updated Info */}
                                        <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
                                            <p>
                                                Cập nhật lần cuối:{' '}
                                                {new Date(selectedConfig.updatedAt).toLocaleString('vi-VN')}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                )}

                {/* Create Config Dialog */}
                <CreateConfigDialog
                    isOpen={isCreateDialogOpen}
                    onClose={() => setIsCreateDialogOpen(false)}
                    onSuccess={handleCreateSuccess}
                />
            </div>
        </Main>
    )
}

