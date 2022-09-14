export interface projectDataType {
    contributionsCount: number
    created_at: string
    description: string
    id: number
    issuesCount: number
    name: string
    ownerUsername: string
    owner_id: number
    updated_at: string
}
export interface userType {
    bio?: any
    contributionsCount: number
    created_at: Date
    email: string
    email_verified_at?: any
    id: number
    issuesCount: number
    name: string
    projectsCount: number
    updated_at: Date
    username: string
}
