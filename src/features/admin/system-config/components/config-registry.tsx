import React from 'react'
import type { SystemConfig } from '@/hooks/api/system-config/types'
import { FeeDistributionConfigEditor } from './fee-distribution-config'

/**
 * Registry để map config name với component editor tương ứng
 * Thêm config mới bằng cách thêm entry vào đây
 */
export const CONFIG_EDITORS: Record<
    string,
    React.ComponentType<{ config: SystemConfig<any> }>
> = {
    'fee-distribution': FeeDistributionConfigEditor as React.ComponentType<{
        config: SystemConfig<any>
    }>,
}

/**
 * Get config editor component by config name
 */
export function getConfigEditor(configName: string) {
    return CONFIG_EDITORS[configName]
}

/**
 * Check if config has a registered editor
 */
export function hasConfigEditor(configName: string): boolean {
    return configName in CONFIG_EDITORS
}

