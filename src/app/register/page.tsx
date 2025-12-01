import RegisterForm from '@/app/components/auth/RegisterForm';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Register - Junkyard Concepts',
    description: 'Create a new account',
};

export default function RegisterPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
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
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Join our community of car enthusiasts. Buy, sell, and trade with confidence.&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="mx-auto flex w-full flex-col justify-center">
                <RegisterForm />
            </div>
        </div>
    );
}
