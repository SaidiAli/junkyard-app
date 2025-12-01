import Sidebar from '@/app/components/dashboard/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - Junkyard Concepts',
    description: 'Manage your account and listings',
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pt-32">
            <Sidebar />
            <div className="flex flex-col">
                <main className="flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
