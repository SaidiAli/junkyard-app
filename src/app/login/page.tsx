import LoginForm from '@/app/components/auth/LoginForm';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login - Junkyard Concepts',
    description: 'Login to your account',
};

export default function LoginPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0">
                    <Image
                        src="/imgs/login-bg.jpg"
                        alt="Login background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-zinc-900/60" />
                </div>
                <div className="relative z-20 flex items-center text-xl font-medium">
                    <img src="/logo.png" alt="Logo" />
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;The best place to find your dream car or sell your old one. Join thousands of satisfied customers today.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>

            <div className="mx-auto flex w-full flex-col justify-center">
                <LoginForm />
            </div>

        </div>
    );
}
