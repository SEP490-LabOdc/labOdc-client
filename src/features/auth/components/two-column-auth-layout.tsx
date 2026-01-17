import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Users2, FileText, Clock, ShieldCheck, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Feature {
    icon: LucideIcon
    title: string
    description: string
}

interface TwoColumnAuthLayoutProps {
    // Left column props
    leftColumn: React.ReactNode
    leftColumnClassName?: string

    // Right column props
    title?: string
    description?: string
    icon?: LucideIcon
    iconClassName?: string
    features?: Feature[]
    rightColumnClassName?: string

    // Layout options
    leftColumnWidth?: '3/5' | '1/2' | '2/5'
    rightColumnWidth?: '2/5' | '1/2' | '3/5'
    showRightColumn?: boolean
    rightColumnContent?: React.ReactNode // Custom right column content
}

const defaultFeatures: Feature[] = [
    {
        icon: FileText,
        title: 'Quy trình đơn giản',
        description: 'Xét duyệt trong 24h',
    },
    {
        icon: Users2,
        title: 'Talent chất lượng',
        description: 'Đã được xác thực',
    },
    {
        icon: ShieldCheck,
        title: 'Bảo mật & tin cậy',
        description: 'Mã hóa & kiểm duyệt dữ liệu',
    },
    {
        icon: Clock,
        title: 'Hỗ trợ nhanh',
        description: 'Sẵn sàng 24/7',
    },
]

export function TwoColumnAuthLayout({
    leftColumn,
    leftColumnClassName,
    title = 'Chào mừng đến với LabOdc',
    description = 'Biến kiến thức thành trải nghiệm thực tế cùng các dự án doanh nghiệp.',
    icon: Icon = Building2,
    iconClassName,
    features = defaultFeatures,
    rightColumnClassName,
    leftColumnWidth = '3/5',
    rightColumnWidth = '2/5',
    showRightColumn = true,
    rightColumnContent,
}: TwoColumnAuthLayoutProps) {
    // Map width options to Tailwind classes
    const leftWidthClasses = {
        '3/5': 'w-full lg:w-3/5',
        '1/2': 'w-full lg:w-1/2',
        '2/5': 'w-full lg:w-2/5',
    }

    const rightWidthClasses = {
        '2/5': 'w-2/5',
        '1/2': 'w-1/2',
        '3/5': 'w-3/5',
    }

    const leftWidthClass = leftWidthClasses[leftColumnWidth]
    const rightWidthClass = rightWidthClasses[rightColumnWidth]

    return (
        <div className="min-h-screen flex">
            {/* Cột trái - Form Content */}
            <div className={cn(leftWidthClass, 'overflow-y-auto', leftColumnClassName)}>
                <div className="p-6 lg:p-12 bg-muted min-h-full flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        className="w-full max-w-2xl mx-auto"
                    >
                        {leftColumn}
                    </motion.div>
                </div>
            </div>

            {/* Cột phải - Decorative Content */}
            {showRightColumn && (
                <div
                    className={cn(
                        'hidden lg:flex',
                        rightWidthClass,
                        'bg-linear-to-br from-primary to-secondary items-center justify-center p-12 fixed right-0 top-0 h-screen',
                        rightColumnClassName
                    )}
                >
                    {rightColumnContent ? (
                        rightColumnContent
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="text-center text-primary-foreground space-y-6"
                        >
                            <div className="w-64 h-64 mx-auto bg-primary-foreground/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Icon className={cn('w-24 h-24 text-accent', iconClassName)} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">{title}</h2>
                                <p className="text-lg text-primary-foreground/90 max-w-md mx-auto">
                                    {description}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
                                    {features.map((feature, index) => {
                                        const FeatureIcon = feature.icon
                                        return (
                                            <div
                                                key={index}
                                                className="bg-primary-foreground/10 rounded-md p-4 backdrop-blur-sm"
                                            >
                                                <FeatureIcon className="h-6 w-6 mb-2 text-accent" />
                                                <div className="font-semibold">{feature.title}</div>
                                                <div className="text-primary-foreground/80">
                                                    {feature.description}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    )
}
