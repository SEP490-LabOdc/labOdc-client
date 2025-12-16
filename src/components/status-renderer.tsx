import React from 'react'

/**
 * Generic component để render component dựa trên status
 * Có thể tái sử dụng cho nhiều loại status khác nhau
 * 
 * @example
 * ```tsx
 * <StatusRenderer
 *   status={milestone.status}
 *   renderers={{
 *     COMPLETE: <CompleteComponent />,
 *     ON_GOING: <OngoingComponent />,
 *     PENDING: <PendingComponent />,
 *   }}
 *   fallback={<DefaultComponent />}
 * />
 * ```
 */
interface StatusRendererProps<T extends string | number> {
    /** Status hiện tại cần check */
    status: T
    /** Object mapping giữa status và component tương ứng */
    renderers: Partial<Record<T, React.ReactNode | ((status: T) => React.ReactNode)>>
    /** Component fallback khi status không match với renderers */
    fallback?: React.ReactNode
}

export function StatusRenderer<T extends string | number>({
    status,
    renderers,
    fallback = null,
}: StatusRendererProps<T>) {
    const renderer = renderers[status]

    // Nếu không có renderer cho status này, return fallback
    if (!renderer) {
        return <>{fallback}</>
    }

    // Nếu renderer là function, gọi function với status
    if (typeof renderer === 'function') {
        return <>{renderer(status)}</>
    }

    // Nếu renderer là ReactNode, return trực tiếp
    return <>{renderer}</>
}

/**
 * Hook helper để tạo renderers object một cách type-safe
 * 
 * @example
 * ```tsx
 * const renderers = useStatusRenderers({
 *   COMPLETE: <CompleteComponent />,
 *   ON_GOING: <OngoingComponent />,
 * })
 * 
 * <StatusRenderer status={status} renderers={renderers} />
 * ```
 */
export function useStatusRenderers<T extends string | number>(
    renderers: Partial<Record<T, React.ReactNode | ((status: T) => React.ReactNode)>>
) {
    return React.useMemo(() => renderers, [renderers])
}

