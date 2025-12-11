/**
 * Tính toán phần trăm tiến độ của milestone dựa trên ngày bắt đầu và kết thúc
 * @param startDate - Ngày bắt đầu (ISO string)
 * @param endDate - Ngày kết thúc (ISO string)
 * @returns Phần trăm tiến độ (0-100)
 */
export const calculateProgress = (startDate: string, endDate: string): number => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = Date.now()

    if (now < start) return 0
    if (now > end) return 100

    return Math.round(((now - start) / (end - start)) * 100)
}

