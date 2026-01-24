export type UpdateRequestType =
    'UPDATE_PROJECT'
    | 'UPDATE_COMPANY'
    | 'UPDATE_MILESTONE'

export type ChangeData = Record<
    string,
    {
        old: any
        new: any
    }
>

export type UpdatePayload = {
    requestType: UpdateRequestType
    targetId: string | number
    changeData: ChangeData
}