import api from "./api";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role?: 'seller';
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            role: string;
        };
    };
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token');
        }
        return null;
    },

    getUser: () => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        }
        return null;
    },

    isAuthenticated: (): boolean => {
        return !!authService.getToken();
    },
};
