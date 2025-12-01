export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data?: T
    error?: string
    timestamp: string
}

export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ErrorResponse {
    success: false
    error: string
    message: string
    timestamp: string
}
