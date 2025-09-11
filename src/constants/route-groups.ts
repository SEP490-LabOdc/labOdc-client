export const groupPath =
    (group: `/${string}`) =>
        (child: `/${string}`) =>
            `${group}${child}` as const

export const ROUTE_GROUPS = {
    public: groupPath('/(public)'),
    errors: groupPath('/(errors)'),
} 