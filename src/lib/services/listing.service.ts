import api from "../api";
import { ApiResponse, Listing, ListingFilter, PaginatedResponse } from "../types";

export const ListingService = {
    // Get all listings with filters and pagination
    getAll: async (filters: ListingFilter = {}) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, String(value));
            }
        });

        const response = await api.get<ApiResponse<PaginatedResponse<Listing>>>(`/listings?${params.toString()}`);
        return response.data;
    },

    // Get featured listings
    getFeatured: async () => {
        const response = await api.get<ApiResponse<Listing[]>>("/listings/featured");
        return response.data;
    },

    // Get latest listings
    getLatest: async () => {
        const response = await api.get<ApiResponse<Listing[]>>("/listings/latest");
        return response.data;
    },

    // Get single listing by ID
    getById: async (id: string) => {
        const response = await api.get<ApiResponse<Listing & { contact: { phone: string, email: string, contactViaAdmin: boolean }, user: { firstName: string, lastName: string } }>>(`/listings/${id}?contact=true`);
        return response.data;
    },

    // Increment view count
    incrementViews: async (id: string) => {
        const response = await api.patch<ApiResponse<void>>(`/listings/${id}/views`);
        return response.data;
    },

    // Search listings (shortcut for getAll with search param)
    search: async (query: string) => {
        return ListingService.getAll({ search: query });
    }
};
