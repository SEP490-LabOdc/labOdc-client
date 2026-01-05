import { Badge } from '@/components/ui/badge'
import { PROJECT_STATUS_LABEL, type ProjectStatus } from '../../project/data/schema'
import { callTypes } from '../../project/data/data'

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
