/**
 * Calculates the percentage of a value relative to a total
 * @param value The value to calculate percentage for
 * @param total The total value to calculate percentage against
 * @param decimals Number of decimal places (default: 2)
 * @returns The percentage value (0-100), or 0 if total is 0 or invalid
 */
export const getPercentage = (value: number, total: number, decimals: number = 2): number => {
    if (!total || total === 0 || isNaN(value) || isNaN(total)) {
        return 0
    }
    const percentage = (value / total) * 100
    return Number(percentage.toFixed(decimals))
}

export const getBarWidth = (percentage: number): string => {
    return `${Math.min(percentage, 100)}%`
}

export const getPercentageColor = (percentage: number): string => {
    if (percentage === 0) return 'bg-gray-200'
    if (percentage < 15) return 'bg-red-400'
    if (percentage < 25) return 'bg-orange-400'
    if (percentage < 40) return 'bg-yellow-400'
    return 'bg-green-500'
}