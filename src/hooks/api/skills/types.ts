export interface SkillFilter {
    key: string
    operator: string
    value: string
    valueTo: any
}

export interface SkillSort {
    key: string
    direction: string
}

export interface SkillPagination {
    page: number
    size: number
}

export interface SkillRequest {
    filters: SkillFilter[]
    sorts: SkillSort[]
    pagination: SkillPagination
}

export interface Skill {
    id: string
    name: string
    description: string
}