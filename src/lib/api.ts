"use client"

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { ApiResponse, ErrorResponse } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null


        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        // If the data is FormData, remove Content-Type header to let the browser set it automatically
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: AxiosError<ErrorResponse>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean
        }

        // If error is 401 and we haven't retried yet, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = typeof window !== "undefined"
                    ? localStorage.getItem("refreshToken")
                    : null

                if (refreshToken) {
                    const response = await axios.post<ApiResponse<{ accessToken: string }>>(
                        `${API_URL}/auth/refresh`,
                        { refreshToken }
                    )

                    const { accessToken } = response.data.data!

                    if (typeof window !== "undefined") {
                        localStorage.setItem("accessToken", accessToken)
                    }

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`
                    }

                    return api(originalRequest)
                }
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect to login
                if (typeof window !== "undefined") {
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("refreshToken")
                    localStorage.removeItem("user")
                    window.location.href = "/login"
                }

                return Promise.reject(refreshError)
            }
        }

        // Handle other errors
        const errorMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred"

        return Promise.reject(new Error(errorMessage))
    }
)

export default api
