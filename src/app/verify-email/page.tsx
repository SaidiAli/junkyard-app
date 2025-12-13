"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No verification token found.');
            return;
        }

        const verify = async () => {
            try {
                await authService.verifyEmail(token);
                setStatus('success');
                setMessage('Email verified successfully! You can now login.');
                // Optional: Redirect to login after a delay
                // setTimeout(() => router.push('/login'), 3000);
            } catch (error: any) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Failed to verify email. The token may be invalid or expired.');
            }
        };

        verify();
    }, [token, router]);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            {status === 'loading' && (
                <>
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <h1 className="text-2xl font-bold">Verifying Email...</h1>
                    <p className="text-muted-foreground">{message}</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-green-600">Verified!</h1>
                    <p className="text-muted-foreground">{message}</p>
                    <div className="mt-6">
                        <Link href="/login">
                            <Button>Go to Login</Button>
                        </Link>
                    </div>
                </>
            )}

            {status === 'error' && (
                <>
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
                    <p className="text-muted-foreground max-w-md">{message}</p>
                    <div className="mt-6">
                        <Link href="/login">
                            <Button variant="outline">Back to Login</Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="container min-h-screen py-20 flex items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
