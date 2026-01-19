export function getChangedFields<
    T extends Record<string, any>
>(oldData: T, newData: T) {
    const changeData: Record<
        string,
        { old: any; new: any }
    > = {}

    Object.keys(newData).forEach((key) => {
        const oldValue = oldData?.[key] ?? ''
        const newValue = newData?.[key] ?? ''

        if (oldValue !== newValue) {
            changeData[key] = {
                old: oldValue,
                new: newValue,
            }
        }
    })

    return changeData
}
