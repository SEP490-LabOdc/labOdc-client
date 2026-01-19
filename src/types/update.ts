export type TargetTable =
    | 'companies'
    | 'projects'
    | 'project_milestones'

export type ChangeData = Record<
    string,
    {
        old: any
        new: any
    }
>

export type UpdatePayload = {
    targetTable: TargetTable
    targetId: string | number
    changeData: ChangeData
}