import { calculatePercentage } from "@/features/talent/team-fund-distribution"

export const getPercentage = (amount: number, totalFund: number): number => {
    return calculatePercentage(amount, totalFund)
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