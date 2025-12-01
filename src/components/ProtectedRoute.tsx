'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    redirectTo?: string;
    allowedRoles?: string[];
}

export default function ProtectedRoute({
    children,
    requireAuth = true,
    redirectTo = '/login',
    allowedRoles,
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        // If authentication is required but user is not authenticated
        if (requireAuth && !isAuthenticated) {
            // Store the intended destination
            const returnUrl = encodeURIComponent(pathname);
            router.push(`${redirectTo}?returnUrl=${returnUrl}`);
            return;
        }

        // If user is authenticated but doesn't have required role
        if (requireAuth && isAuthenticated && allowedRoles && user) {
            if (!allowedRoles.includes(user.role)) {
                router.push('/unauthorized');
                return;
            }
        }

        // If user is authenticated and trying to access auth pages (login/register)
        if (!requireAuth && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, isLoading, requireAuth, router, redirectTo, allowedRoles, user, pathname]);

    // Show loading spinner while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // If auth is required and user is not authenticated, show nothing (will redirect)
    if (requireAuth && !isAuthenticated) {
        return null;
    }

    // If role check fails, show nothing (will redirect)
    if (requireAuth && isAuthenticated && allowedRoles && user && !allowedRoles.includes(user.role)) {
        return null;
    }

    // If this is an auth page and user is authenticated, show nothing (will redirect)
    if (!requireAuth && isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
