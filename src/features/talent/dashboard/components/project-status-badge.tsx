import { Badge } from '@/components/ui/badge'
import { callTypes } from '@/features/labAdmin/project/data/data'
import { PROJECT_STATUS_LABEL, type ProjectStatus } from '@/features/labAdmin/project/data/schema'

export default function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
    const className =
        callTypes.get(status) ??
        'bg-muted text-muted-foreground border-border'

    const label = PROJECT_STATUS_LABEL[status] ?? status

    return (
        <Badge variant="outline" className={className}>
            {label}
        </Badge>
    )
}
